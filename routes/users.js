var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');


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
    });
})();

router.get('/', async (req, res) => {
  console.log('test', req.test);
  const [results, fields] = await pool.execute(`SELECT * FROM users`);
  // line 13 is equivalent to this:
  // const arr = await connection.execute(`SELECT * FROM Movies`);
  // const results = arr[0];
  // const fields = arr[1];

  res.send(results);
});

module.exports = router;
