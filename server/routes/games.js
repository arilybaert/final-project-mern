const router = require('express').Router();
const fetch = require("node-fetch");
let Game = require('../models/game.model');
require('dotenv').config();

// const url = process.env.API_SCOREBOARD_URL;

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
    let games = [];
    req.body.games.forEach(game => {

        const _id = game._id;
        const isStartTimeTBD = game.isStartTimeTBD;
        const isGameActivated = game.isGameActivated;
        const startTimeEastern = game.startDateEastern;
        const startDateEastern = game.startDateEastern;
        const startTimeISO = game.startTimeISO;
        const vTeam = game.vTeam;
        const vTeamTricode = game.vTeamTricode;
        const vTeamScore = game.vTeamScore;
        const hTeam = game.hTeam;
        const hTeamTricode = game.hTeamTricode;
        const hTeamScore = game.hTeamScore;

        games.push({
            _id,
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
    });

    const newGame = new Game ({
        _id,
        games: games
    })

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