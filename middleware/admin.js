const jwt = require('jsonwebtoken');
const config = require('config');
const mysql = require('mysql2/promise');

module.exports = function(req, res, next) {
  let pool;
  (async function initializePool() {
    pool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '12345678',
      database: 'mynextvacation',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  })();

  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    const [user, fields] = pool.execute('select * from users where email=?', [
      req.user.email
    ]);
    if (user.isAdmin) {
      next();
    }
  } catch {
    res.status(401).json({ msg: 'User is not Admin' });
  }
};
