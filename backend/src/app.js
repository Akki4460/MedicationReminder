const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const acknowledgmentLogsRoutes = require('./routes/logRoutes')
const adminRoutes = require('./routes/adminRoutes')


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


// Routes
app.use('/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/acknowledgment', acknowledgmentLogsRoutes)
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the MedicationReminder App!');
});

module.exports = app;
