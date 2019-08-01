const jwt = require('jsonwebtoken');
const config = require('config');
const mysql = require('mysql2/promise');

module.exports = async function(req, res, next) {
  const connection = await mysql.createConnection({
    host: 'arfo8ynm6olw6vpn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'lhxvwb5br09qed9q',
    password: 'zbr09pqsq16q5x0f',
    database: 'sjs4cydlaupisok1'
  });

  const [rows, fields] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [req.user.id]
  );

  try {
    if (rows[0].isAdmin === null) {
      return res.status(400).json({ errors: [{ msg: 'User is not Admin' }] });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'User is not Admin' });
  }
};
