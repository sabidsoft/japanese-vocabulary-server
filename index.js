require('dotenv').config();
const express = require('express');
const connectDatabase = require('./src/configs/database.config');

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

connectDatabase();
