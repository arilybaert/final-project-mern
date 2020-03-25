const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameDaySchema = new Schema({
    _id: {type: String, required: true},
    games:[{
        _id: {type: String, required: true},
        isStartTimeTBD: {type: Boolean, required: true},
        isGameActivated: {type: Boolean, required: true},
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

const GameDay = mongoose.model('GameDay', gameDaySchema);

module.exports = GameDay;