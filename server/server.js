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
    database: 'mayaavida/messages',
    user: 'mayaavida',
    password: DB_PASSWORD
});


app.get('/', (req, res) => {
    res.sendStatus(202);
});

app.get('/messages', (req, res) => {
    let query = 'SELECT * FROM "messages" ORDER BY "timestamp" DESC LIMIT 10';

    pool.query(query)
    .then((result) => {
        res.status(200).send(result.rows);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

app.post('/messages', (req, res) => {
    const newMessage = req.body;
    const queryText = `
        INSERT INTO "messages" ("id", "title", "text", "timestamp")
        VALUES ('${newMessage.id}', '${newMessage.title}', '${newMessage.text}', '${newMessage.timestamp}');
    `;
    pool.query(queryText)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});