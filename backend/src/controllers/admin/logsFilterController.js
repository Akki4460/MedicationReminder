const { AcknowledgmentLog } = require('../../models/Log');
const { Op } = require('sequelize'); // Sequelize operators

const getFilteredAcknowledgmentLogs = async (req, res) => {
    const { patient_id, start_date, end_date, page = 1, limit = 10 } = req.query;

    try {
        const filters = {};

        if (patient_id) {
            filters.user_id = patient_id;
        }

        if (start_date || end_date) {
            filters.timestamp = {};
            if (start_date) {
                if (isNaN(Date.parse(start_date))) {
                    return res.status(400).json({ message: 'Invalid start date' });
                }
                filters.timestamp[Op.gte] = new Date(start_date);
            }
            if (end_date) {
                if (isNaN(Date.parse(end_date))) {
                    return res.status(400).json({ message: 'Invalid end date' });
                }
                filters.timestamp[Op.lte] = new Date(end_date);
            }
        }

        const offset = (page - 1) * limit;

        const logs = await AcknowledgmentLog.findAll({
            where: filters,
            limit: parseInt(limit),
            offset,
            attributes: ['id', 'user_id', 'medicine_id', 'status', 'timestamp'], // Select specific fields
        });

        const totalLogs = await AcknowledgmentLog.count({ where: filters });

        if (!logs.length) {
            return res.status(404).json({ message: 'No acknowledgment logs found for the given filters' });
        }

        res.status(200).json({
            message: 'Acknowledgment logs fetched successfully',
            data: logs,
            meta: {
                total: totalLogs,
                page: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        console.error('Error fetching acknowledgment logs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getFilteredAcknowledgmentLogs };
