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
    queueLimit: 0,
    dateStrings: true
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
    res.json(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /vacations
// @desc    Get all vacations
// @access  Private

router.get('/followed', auth, async (req, res) => {
  try {
    const [vacations, fields] = await pool.execute(
      `SELECT * from vacations
    INNER JOIN savedvacations on savedvacations.vacationId = vacations.id
    WHERE savedvacations.userID = ?`,
      [req.user.id]
    );
    res.json(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /vacations/follow/:id
// @desc    Follow a vacation
// @access  Private
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const [vacation] = await pool.execute(
      `SELECT * FROM vacations WHERE id=?`,
      [req.params.id]
    );

    const [likedVacations] = await pool.execute(
      'SELECT * FROM savedvacations WHERE userID = ? AND vacationID = ?',
      [req.user.id, vacation[0].id]
    );
    console.log(likedVacations.length);
    if (likedVacations.length === 0) {
      await pool.execute(
        `INSERT INTO savedvacations (userID, vacationID) VALUES (?, ?);`,
        [req.user.id, vacation[0].id]
      );

      if (vacation[0].followers === null) {
        await pool.execute(`UPDATE vacations SET followers=? WHERE id=?`, [
          1,
          req.params.id
        ]);
        console.log('1 follower added');
      } else {
        await pool.execute(`UPDATE vacations SET followers=? WHERE id=?`, [
          vacation[0].followers + 1,
          req.params.id
        ]);
        console.log(`${vacation[0].followers + 1} added`);
      }

      res.send({
        status: 'success'
      });
    } else {
      return res.status(400).json({ msg: 'Vacation already followed by user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Post not found' });
  }
});

// @route   PUT /unfollow/:id
// @desc    Unike a post
// @access  Private
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const [likedVacations] = await pool.execute(
      'DELETE from savedvacations WHERE vacationID = ? and userID = ?',
      [req.params.id, req.user.id]
    );

    console.log(likedVacations.affectedRows);
    if (likedVacations.affectedRows > 0) {
      const [vacation] = await pool.execute(
        `SELECT * FROM vacations WHERE id=?`,
        [req.params.id]
      );
      res.send('deleted saved vacation');
      await pool.execute(`UPDATE vacations SET followers=? WHERE id=?`, [
        vacation[0].followers - 1,
        req.params.id
      ]);
      console.log(`${vacation[0].followers - 1} followers`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Post not found' });
  }
});

module.exports = router;
