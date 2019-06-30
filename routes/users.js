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
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'mynextvacation',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

router.get('/', async (req, res) => {
  console.log('test', req.test);
  const [results, fields] = await pool.execute(`SELECT * FROM users`);

  res.send(results);
});

// @route   POST api/users
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
      console.log(firstName, lastName, email, userPassword);
      const [results, fields] = await pool.execute(
        `SELECT * FROM users
      WHERE email=?`,
        [email]
      );

      console.log(results);

      if (results.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const salt = await bycrypt.genSalt(10);

      hashPassword = await bycrypt.hash(userPassword, salt);
      console.log(hashPassword);

      await pool.execute(
        `INSERT INTO users (firstName, lastName, email, userPassword) VALUES (?, ?, ?, ?);`,
        [firstName, lastName, email, hashPassword]
      );
      const [user] = await pool.execute(`SELECT * FROM users WHERE email=?`, [
        email
      ]);
      // res.send({ status: 'success', firstName: firstName, user: user });

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
