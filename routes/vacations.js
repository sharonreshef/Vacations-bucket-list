const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

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

// @route   POST /vacations
// @desc    Create a vacation
// @access  Private
router.post(
  '/',
  [
    auth,
    admin,
    [
      check('vacationDescription', 'Description is required')
        .not()
        .isEmpty(),
      check('startingDate', 'Starting date is required')
        .not()
        .isEmpty(),
      check('endingDate', 'Ending date is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      vacationDescription,
      image,
      startingDate,
      endingDate,
      price
    } = req.body;

    try {
      await pool.execute(
        `INSERT INTO vacations (vacationDescription, image, startingDate, endingDate, price) VALUES (?, ?, ?, ?, ?);`,
        [vacationDescription, image, startingDate, endingDate, price]
      );
      res.send({
        status: 'success',
        vacation: {
          vacationDescription,
          image,
          startingDate,
          endingDate,
          price
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /vacations/:id
// @desc    Delete a vacation
// @access  Private
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const [results] = await pool.execute(`DELETE FROM vacations WHERE id=?`, [
      req.params.id
    ]);
    res.send({ status: 'success', deletedId: req.params.id });

    // Check user
    if (!results) {
      return res.status(404).json({ msg: 'vacation not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   GET /vacations
// @desc    Get all vacations
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const [vacations, fields] = await pool.execute(`SELECT * FROM vacations`);
    res.send(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
