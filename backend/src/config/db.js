const mysql = require('mysql2/promise'); 

let db; 

async function connectDB() {
  try {

    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}


async function query(sql, params) {
  try {
    if (!db) {
      throw new Error('Database connection is not initialized. Call connectDB first.');
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Query failed:', error.message);
    throw error;
  }
}

module.exports = {
  connectDB,
  query, 
};
