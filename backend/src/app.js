const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the MedicationReminder App!');
});

module.exports = app;
