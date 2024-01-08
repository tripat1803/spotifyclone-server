const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001'
    ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.use("/api", require('./src/routes'));

module.exports = app;