require('dotenv').config(); 

const mysql = require('mysql2'); 
const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/db');

const { User } = require('./src/models/User');
const { Medicine } = require('./src/models/Medicine');

const PORT = process.env.PORT || 5000;


app.set('db', connectDB); // Allows other parts of the app to access `db` through `req.app.get('db')`


async function syncDatabase() {
  try {
    // Sync the models with the database (this will alter the table if needed)
    await sequelize.sync({ alter: true});
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Database sync failed:', error);
  }
}

syncDatabase();


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB()
});
