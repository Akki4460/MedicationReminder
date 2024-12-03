const { query } = require('../config/db');

const createUser = async (name, email, passwordHash, role = 'user') => {
  const sql = `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
  return query(sql, [name, email, passwordHash, role]);
};

const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const users = await query(sql, [email]);
  return users[0];
};

const findUserById = async (id) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const users = await query(sql, [id]);
  return users[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
