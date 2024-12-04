const { AcknowledgmentLog } = require('../../models/Log');
const { Op } = require('sequelize'); //Sequelize operators

// Fetching logs by patient or date range
const getFilteredAcknowledgmentLogs = async (req, res) => {
    const { patient_id, start_date, end_date } = req.query;

    try {
        const filters = {};

        if (patient_id) {
            filters.user_id = patient_id;
        }

        if (start_date || end_date) {
            filters.timestamp = {};
            if (start_date) filters.timestamp[Op.gte] = new Date(start_date);
            if (end_date) filters.timestamp[Op.lte] = new Date(end_date);
        }

        const logs = await AcknowledgmentLog.findAll({ where: filters });

        // console.log(logs)

        if (!logs.length) {
            return res.status(404).json({ message: 'No acknowledgment logs found for the given filters' })
        }

        res.status(200).json({ message: 'Acknowledgment logs fetched successfully', data: logs })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message })
    }
};

module.exports = { getFilteredAcknowledgmentLogs };
