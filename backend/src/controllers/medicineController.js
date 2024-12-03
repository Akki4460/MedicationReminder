const { Medicine } = require('../models/Medicine');

// Creating new medicine schedule
const createMedicine = async (req, res) => {
  const { name, dosage, schedule_time, repeat_interval } = req.body;
//   console.log(req.user)
  const userId = req.user.id; //JWT token

//   console.log(userId)
  try {
    const medicine = await Medicine.create({
      name,
      dosage,
      schedule_time,
      repeat_interval,
      user_id: userId, 
    });

    res.status(201).json({ message: 'Medicine schedule created successfully', data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all medicine schedules 
const getMedicines = async (req, res) => {
  const userId = req.user.id; 

  try {
    const medicines = await Medicine.findAll({
      where: { user_id: userId }, 
    });
    res.status(200).json({ data: medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a medicine schedule by ID
const getMedicineById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const medicine = await Medicine.findOne({
      where: { id, user_id: userId }, 
    });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine schedule not found' });
    }
    res.status(200).json({ data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a medicine schedule
const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, dosage, schedule_time, repeat_interval } = req.body;
  const userId = req.user.id; 

  try {
    const medicine = await Medicine.findOne({
      where: { id, user_id: userId }, 
    });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine schedule not found' });
    }

    // Update details
    medicine.name = name || medicine.name;
    medicine.dosage = dosage || medicine.dosage;
    medicine.schedule_time = schedule_time || medicine.schedule_time;
    medicine.repeat_interval = repeat_interval || medicine.repeat_interval;

    await medicine.save();

    res.status(200).json({ message: 'Medicine schedule updated successfully', data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a medicine schedule
const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const medicine = await Medicine.findOne({
      where: { id, user_id: userId }, 
    });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine schedule not found' });
    }

    await medicine.destroy();
    res.status(200).json({ message: 'Medicine schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
