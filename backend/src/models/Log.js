const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Assuming sequelize instance is already configured
const { User } = require('./User');
const { Medicine } = require('./Medicine');

const AcknowledgmentLog = sequelize.define('AcknowledgmentLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Refers to the 'User' model
      key: 'id',
    },
  },
  medicine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medicine,  // Refers to the 'Medicine' model
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,  // Either 'acknowledged' or 'not acknowledged'
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'acknowledgmentlogs',
  timestamps: false,  // We are handling timestamps manually
});

module.exports = { AcknowledgmentLog };
