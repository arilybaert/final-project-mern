const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
        .then(games => res.json(games))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const gameID = req.body.gameID;
    const isStartTimeTBD = req.body.isStartTimeTBD;
    const isGameActivated = req.body.isGameActivated;
    const startTimeEastern = req.body.startDateEastern;
    const startDateEastern = req.body.startDateEastern;
    const startTimeISO = req.body.startTimeISO;

    const vTeam = req.body.vTeam;
    const vTeamTricode = req.body.vTeamTricode;
    const vTeamScore = req.body.vTeamScore;

    const hTeam = req.body.hTeam;
    const hTeamTricode = req.body.hTeamTricode;
    const hTeamScore = req.body.hTeamScore;

    const newGame = new Game ({
        gameID,
        isGameActivated,
        isStartTimeTBD,
        startDateEastern,
        startTimeEastern,
        startTimeISO,
        hTeam,
        hTeamScore,
        hTeamTricode,
        vTeam,
        vTeamScore,
        vTeamTricode,
    });

    newGame.save()
        .then(() => res.json('Game added cuz'))
        .catch(err => res.status(400).json('error' + err));
});

module.exports = router;