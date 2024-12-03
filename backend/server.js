require('dotenv').config(); 

const mysql = require('mysql2'); 
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 5000;


app.set('db', connectDB); // Allows other parts of the app to access `db` through `req.app.get('db')`


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB()
});
