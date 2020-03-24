const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    _id: {type: String, required: true},
    games:[{
        gameID: {type: String, required: true},
        isStartTimeTBD: {type: String, required: true},
        isGameActivated: {type: String, required: true},
        startTimeEastern: {type: String, required: false},
        startDateEastern: {type: Date, required: true},
        startTimeISO: {type: String, required: true},
        vTeamTricode: {type: String, required: true},
        vTeamScore: {type: String, required: true},
        vTeam: {type: String, required: true},
        hTeam: {type: String, required: true},
        hTeamTricode: {type: String, required: true},
        hTeamScore: {type: String, required: true},
    }]

}, {
    timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;