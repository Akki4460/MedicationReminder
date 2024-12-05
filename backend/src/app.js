const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const acknowledgmentLogsRoutes = require('./routes/logRoutes')
const adminRoutes = require('./routes/adminRoutes')

const cors = require('cors')




const app = express();

// Middleware/ Apply body-parser only to methods that need it
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      bodyParser.json()(req, res, next);
  } else {
      next();
  }
});
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())

// Routes
app.use('/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/acknowledgment', acknowledgmentLogsRoutes)
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the MedicationReminder App!');
});

module.exports = app;
