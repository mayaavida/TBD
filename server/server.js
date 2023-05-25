const express = require('express');
const app = express();
const pg = require('pg');

const PORT = process.env.PORT || 8000;
const DB_PASSWORD = process.env.DB_PASSWORD

app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
});

app.use(express.json());

const pool = new pg.Pool({
    host: 'db.bit.io',
    port: 5432,
    ssl: true,
    database: 'mayaavida/trial',
    user: 'mayaavida',
    password: DB_PASSWORD
});


app.get('/', (req, res) => {
    res.sendStatus(202);
});

app.get('/messages', (req, res) => {
    let query = 'SELECT * FROM "messages";';

    pool.query(query)
    .then((result) => {
        res.status(200).send(result.rows);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});