const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');
const port = process.env.PORT || 8000;
const secret = process.env.SECRET || 'local passphrase personal portfolio';

app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(morgan('dev'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
