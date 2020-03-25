const router = require('express').Router();
const fetch = require("node-fetch");
let GameDay = require('../models/gameDay.model');
require('dotenv').config();

const url = process.env.API_SCOREBOARD_URL;

// @TODO CMAKE DATE DYNAMIC

const gameDate = "20200212"

/* CHECK IF THE DAILY SCOREBOARD IS ALREADY PRESENT IN THE DB, IF IT IS, UPDATE IT */
router.route('/').get((req, res) => {

    GameDay.exists({
        _id: gameDate
    }, function (err, result) {
        // ERROR
        if (err) {
            res.status(400).json('Error: ' + err);
        } else {
            console.log(result);

            // @TODO UPDATE GAME
            let games = {
                "games": []
            };

            fetch(url)
                .then(res => res.json())
                .then(json => {

                    // @TODO
                    json.games.forEach(game => {

                        const _id = game.gameId;
                        const isStartTimeTBD = game.isStartTimeTBD;
                        const isGameActivated = game.isGameActivated;
                        const startTimeEastern = game.startTimeEastern;
                        const startDateEastern = game.startDateEastern;
                        const startTimeISO = game.startTimeUTC;
                        const vTeam = game.vTeam.teamId;
                        const vTeamTricode = game.vTeam.triCode;
                        const vTeamScore = game.vTeam.score;
                        const hTeam = game.hTeam.teamId;
                        const hTeamTricode = game.hTeam.triCode;
                        const hTeamScore = game.hTeam.score;

                        games["games"].push({
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
                    //console.log(games);
                    const options = {
                        new: true,
                        upsert: true,
                    }
                    GameDay.findOneAndUpdate({_id: gameDate}, games, {new: true, upsert: true}, function (err) {
                        if (err) {
                            console.log(err);
                        }
      
                    })
                        .then(games => res.json(games))
                        .catch(err => res.status(400).json('Error ' + err));
                });
        }
    })

    // Game.find()
    //     .then(games => res.json(games))
    //     .catch(err => res.status(400).json('Error ' + err));

    // Game.findOne({ _id: gameDate })
});



// GET SPECIFIC GAME
router.route('/:id').get((req, res) => {
    GameDay.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err => res.status(400).json('Error: ' + err));
});

// // UPDATE GAME
// router.route('/update/:id').post((req, res) => {

//       })

module.exports = router;