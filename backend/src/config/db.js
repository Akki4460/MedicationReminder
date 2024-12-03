const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Testing
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit on failure
  }
};



module.exports = {
  sequelize,
  connectDB,
};
