const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: 'arfo8ynm6olw6vpn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'lhxvwb5br09qed9q',
    password: 'zbr09pqsq16q5x0f',
    database: 'sjs4cydlaupisok1',
    waitForConnections: true,
    connectionLimit: 8,
    queueLimit: 0
  });
})();

// @route   GET /auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const [results, fields] = await pool.execute(
      'select * from users where id=?',
      [req.user.id]
    );
    res.json(results[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /auth
// @desc    Authenicate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('userPassword', 'Password is requierd').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, userPassword } = req.body;

    try {
      const [results, fields] = await pool.execute(
        `SELECT * FROM users
      WHERE email=?`,
        [email]
      );
      if (results <= 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(
        userPassword,
        results[0].userPassword
      );
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: results[0].id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
