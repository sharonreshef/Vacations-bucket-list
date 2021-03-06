var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
const bycrypt = require('bcryptjs');
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

// @route   POST /users
// @desc    Test
// @access  Public
router.get('/', async (req, res) => {
  const [results, fields] = await pool.execute(`SELECT * FROM users`);

  res.send(results);
});

// @route   POST /users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'userPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, userPassword } = req.body;

    user = {
      firstName,
      lastName,
      email,
      userPassword
    };

    try {
      const [results, fields] = await pool.execute(
        `SELECT * FROM users
      WHERE email=?`,
        [email]
      );

      if (results.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const salt = await bycrypt.genSalt(10);

      hashPassword = await bycrypt.hash(userPassword, salt);

      await pool.execute(
        `INSERT INTO users (firstName, lastName, email, userPassword) VALUES (?, ?, ?, ?);`,
        [firstName, lastName, email, hashPassword]
      );
      const [user] = await pool.execute(`SELECT * FROM users WHERE email=?`, [
        email
      ]);

      const payload = {
        user: {
          id: user[0].id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
