const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
});

app.use(express.json());


app.get('/message', (req, res) => {
    console.log('Request for message was made');
    res.sendStatus(202);
})