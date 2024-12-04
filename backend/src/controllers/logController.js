const { AcknowledgmentLog } = require('../models/Log');

const logAcknowledgment = async (req, res) => {
  const { medicine_id, status } = req.body;  

  try {
   
    if (!medicine_id || !status) {
      return res.status(400).json({ message: 'Missing required fields: medicine_id, status' });
    }

   
    const acknowledgmentLog = await AcknowledgmentLog.create({
      user_id: req.user.id,  // Using req.user.id from the JWT token
      medicine_id,
      status,
      timestamp: new Date(),
    });

    res.status(201).json({ message: 'Acknowledgment log created successfully', data: acknowledgmentLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetching acknowledgment logs for a specific user
const getAcknowledgmentLogsByUser = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const logs = await AcknowledgmentLog.findAll({ where: { user_id } });
      if (logs.length === 0) {
        return res.status(404).json({ message: 'No acknowledgment logs found for this user' });
      }
  
      res.status(200).json({ data: logs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Fetching acknowledgment logs for a specific medicine
  const getAcknowledgmentLogsByMedicine = async (req, res) => {
    const { medicine_id } = req.params;
  
    try {
      const logs = await AcknowledgmentLog.findAll({ where: { medicine_id } });
      if (logs.length === 0) {
        return res.status(404).json({ message: 'No acknowledgment logs found for this medicine' });
      }
  
      res.status(200).json({ data: logs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  module.exports = {
    logAcknowledgment,
    getAcknowledgmentLogsByUser,
    getAcknowledgmentLogsByMedicine,
  };