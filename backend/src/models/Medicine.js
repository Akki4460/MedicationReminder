const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./User'); 

const Medicine = sequelize.define('Medicine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  repeat_interval: {
    type: DataTypes.STRING,
    allowNull: true, //daily, weekly, monthly
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'medicine',
  timestamps: true,
});

// relationship
Medicine.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', 
});
module.exports = { Medicine };

