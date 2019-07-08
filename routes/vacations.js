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
router.post('/', [auth, admin], async (req, res) => {
  const {
    vacationDescription,
    image,
    startingDate,
    endingDate,
    price
  } = req.body.formData;

  try {
    console.log(req.body);

    await pool.execute(
      `INSERT INTO vacations (vacationDescription, image, startingDate, endingDate, price) VALUES (?, ?, ?, ?, ?);`,
      [vacationDescription, image, startingDate, endingDate, price]
    );
    const vacation = {
      vacationDescription,
      image,
      startingDate,
      endingDate,
      price
    };
    res.json(vacation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /vacations/:id
// @desc    Delete a vacation
// @access  Private
router.delete('/:id', [auth, admin], async (req, res) => {
  console.log(`deleting vacation id ${req.params.id}`);
  try {
    const [results] = await pool.execute(
      `SELECT * FROM savedvacations WHERE vacationId=?`,
      [req.params.id]
    );

    if (results.length > 0) {
      await pool.execute('DELETE FROM savedvacations where VacationId=?', [
        req.params.id
      ]);
    }

    await pool.execute(`DELETE FROM vacations WHERE id=?`, [req.params.id]);
    res.send({ status: 'success', deletedId: req.params.id });

    if (!results) {
      return res.status(404).json({ msg: 'Vacation not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Vacation not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   UPDATE /vacations/:id
// @desc    edit a vacation
// @access  Private
// router.update('/:id', [auth, admin], async (req, res) => {
//   try {
//     const [results] = await pool.execute(`UPDATE vacations SET ${} = ${} WHERE id=?`, [
//       req.params.id
//     ]);
//     res.send({ status: 'success', deletedId: req.params.id });

//     // Check user
//     if (!results) {
//       return res.status(404).json({ msg: 'vacation not found' });
//     }
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     res.status(500).send('Server Error');
//   }
// });

// UPDATE `mynextvacation`.`vacations` SET `price` = '4000' WHERE (`id` = '47');

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

// @route   GET /vacations/:id
// @desc    Get specific vacation data
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const [vacation, fields] = await pool.execute(
      `SELECT * FROM vacations WHERE id=?`,
      [req.params.id]
    );
    res.json(vacation);
    console.log(vacation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /vacations/followed
// @desc    Get all vacations followed by user
// @access  Private

router.get('/followed', auth, async (req, res) => {
  try {
    const [vacations, fields] = await pool.execute(
      `SELECT vacations.* from vacations
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

    const [likedVacation] = await pool.execute(
      'SELECT * FROM savedvacations WHERE userID = ? AND vacationID = ?',
      [req.user.id, vacation[0].id]
    );
    console.log('liked vacations', likedVacation.length);
    if (likedVacation.length === 0) {
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
      return res
        .status(400)
        .json({ errors: [{ msg: 'Vacation already followed by user' }] });
    }
  } catch (err) {
    res.status(404).json({ errors: [{ msg: 'Vacation not found' }] });
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
