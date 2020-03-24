const router = require('express').Router();
const fetch = require("node-fetch");
let Game = require('../models/game.model');
require('dotenv').config();

const url = process.env.API_SCOREBOARD_URL;

// // FETCH SCORES BY DAY FROM API
// fetch(url)
//     .then(res => res.json())
//     .then(json => console.log(json.games));

/* CHECK IF THE DAILY SCOREBOARD IS ALREADY PRESENT IN THE DB, IF IT IS, UPDATE IT */
router.route('/').get((req, res) => {

    // Game.exists({startTimeEastern: "20200211"}, function(err, result) {
    //     if(err) {
    //         res.status(400).json('Error: ' + err);
    //     } else {
    //         res.json(result);
    //     }
    // })

    Game.find()
        .then(games => res.json(games))
        .catch(err => res.status(400).json('Error ' + err));
});

//@TODO when an array is add the mongoDB returns it empty

// ADD GAMES
router.route('/add').post((req, res) => {
    const _id = req.body._id;
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
        _id,
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

// GET SPECIFIC GAME
router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err => res.status(400).json('Error: ' +err));
});

// UPDATE GAME
router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
        .then(game => {
            game.gameID = req.body.gameID;
            game.isStartTimeTBD = req.body.isStartTimeTBD;
            game.isGameActivated = req.body.isGameActivated;
            game.startTimeEastern = req.body.startDateEastern;
            game.startDateEastern = req.body.startDateEastern;
            game.startTimeISO = req.body.startTimeISO;
            game.vTeam = req.body.vTeam;
            game.vTeamTricode = req.body.vTeamTricode;
            game.vTeamScore = req.body.vTeamScore;
            game.hTeam = req.body.hTeam;
            game.hTeamTricode = req.body.hTeamTricode;
            game.hTeamScore = req.body.hTeamScore;

            game.save()
                .then(() => res.json('Game updated'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
      })

module.exports = router;