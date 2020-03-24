const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
// allows to parse json
app.use(express.json());

// LOCATE SERVER URI AND CONNECT TO DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Wagwan, ma mans db is connected cuz')
})

// REQUIRE AND LOCATE FILES
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// START SERVER
app.listen(port, () => {
    console.log(`tsss ya server is running bruv, ${port}`);
});