import { Request, Response, NextFunction } from 'express';
import { default as fetch } from 'node-fetch';
import { IGameStats, GameStats, gameStatsSchema } from '../../models/mongoose';

class GameStatsController {
    private gameStats: Array<IGameStats>;
    private gameDate: string;
    private gameId: string;
    private GAME_STATS_URL_PREFIX: string;
    private GAME_STATS_URL_SUFFIX: string;

    constructor() {
        this.gameStats = [];
        this.gameDate = '20200211';
        this.gameId = '0021900802';
        this.GAME_STATS_URL_PREFIX = 'http://data.nba.net/10s/prod/v1/'
        this.GAME_STATS_URL_SUFFIX = '_boxscore.json'
    }


    // GET DATA FROM NBA API
    getGameStats = async (gameDate: string, gameId: string) => {
        const url = `${this.GAME_STATS_URL_PREFIX}${gameDate}/${gameId}${this.GAME_STATS_URL_SUFFIX}`;
        const response = await fetch(url);
        return response.json();

    } 

    // EMPTY GAMES STATS
    gameStatsCreate = async (
        _id: string,
        status: string,
        startTimeUTC: string,
        startTimeEastern: string,
        isStartTimeTBD: Boolean,
        vTeamScore: string,
        hTeamScore: string,
        vTeam: Array<any>,
        hTeam: Array<any>,
    ) => {
        const gameStatsDetail = {
            _id,
            status,
            startTimeUTC,
            startTimeEastern,
            isStartTimeTBD,
            vTeamScore,
            hTeamScore,
            vTeam,
            hTeam,
        }

        const gameStats: IGameStats = new GameStats(gameStatsDetail);

        try {
            const createdGameStats = await gameStats.save();
            this.gameStats.push(createdGameStats);

            console.log('Gamestats created');
        } catch (err) {
            console.log('An error occured when creating GAME STATS');
        }
    }

        // FILL THE GAMESTATS
    createGameStats = async (date: string, id: string) => {

        const vTeamActivePlayers: Array<any> = []
        const hTeamActivePlayers: Array<any> = []
        
        let data = await this.getGameStats(date, id);
        
        const vTeamId = data.basicGameData.vTeam.teamId;
        const hTeamId = data.basicGameData.hTeam.teamId;
        const _id = data.basicGameData.gameId;
        let gameStats;

        // SAVE PARTIAL IF GAME IS TBD
        if(data.basicGameData.isStartTimeTBD === true ) {
            gameStats = {
                status: "game tbd",
                isStartTimeTBD: data.basicGameData.isStartTimeTBD,
                vTeamScore: data.basicGameData.vTeam.score,
                hTeamScore: data.basicGameData.hTeam.score,
                vTeam: {
                    triCode: data.basicGameData.vTeam.triCode,
                    
                },
                hTeam: {
                    triCode: data.basicGameData.hTeam.triCode,
                    
                }
                }
        }
        // SAVE PARTIAL IF GAME HASN'T STARTED YET
        else if(data.basicGameData.isStartTimeTBD === false && data.basicGameData.gameDuration.minutes === "") {

            gameStats = {
                    status: "game hasn't started",
                    isStartTimeTBD: data.basicGameData.isStartTimeTBD,
                    vTeamScore: data.basicGameData.vTeam.score,
                    hTeamScore: data.basicGameData.hTeam.score,
                    vTeam: {
                        triCode: data.basicGameData.vTeam.triCode,
                        
                    },
                    hTeam: {
                        triCode: data.basicGameData.hTeam.triCode,
                        
                    }
                }
            }
        else {
            data.stats.activePlayers.forEach(function (activePlayer)  {
                if(activePlayer.teamId === vTeamId) {
                    const playerId = activePlayer.personId;
                    const teamId = activePlayer.teamId;
                    const firstName = activePlayer.firstName;
                    const lastName = activePlayer.lastName;
                    const points = activePlayer.points;
                    const tpm = activePlayer.tpm;
                    const assists = activePlayer.assists;
                    const rebounds = activePlayer.totReb;
                    const fgp = activePlayer.fgp;
                    const to = activePlayer.turnovers;
                    const stl = activePlayer.steals;
                    const blk = activePlayer.blocks;

                    vTeamActivePlayers.push({
                        playerId,
                        teamId,
                        firstName,
                        lastName,
                        points,
                        tpm,
                        assists,
                        rebounds,
                        fgp,
                        to,
                        stl,
                        blk,
                    });
                } if (activePlayer.teamId === hTeamId) {
                    const playerId = activePlayer.personId;
                    const teamId = activePlayer.teamId;
                    const firstName = activePlayer.firstName;
                    const lastName = activePlayer.lastName;
                    const points = activePlayer.points;
                    const tpm = activePlayer.tpm;
                    const assists = activePlayer.assists;
                    const rebounds = activePlayer.totReb;
                    const fgp = activePlayer.fgp;
                    const to = activePlayer.turnovers;
                    const stl = activePlayer.steals;
                    const blk = activePlayer.blocks;

                    hTeamActivePlayers.push({
                        playerId,
                        teamId,
                        firstName,
                        lastName,
                        points,
                        tpm,
                        assists,
                        rebounds,
                        fgp,
                        to,
                        stl,
                        blk,
                    });                }
                    
            });

            gameStats = {
                status: "game",

                startTimeUTC: data.basicGameData.startTimeUTC,
                startTimeEastern: data.basicGameData.startTimeEastern,
                isStartTimeTBD: data.basicGameData.isStartTimeTBD,
                vTeamScore: data.basicGameData.vTeam.score,
                hTeamScore: data.basicGameData.hTeam.score,
                vTeam: {
                  triCode: data.basicGameData.vTeam.triCode,
                    leaders: {
                        points : {
                            firstName: data.stats.vTeam.leaders.points.players['0'].firstName,
                            lastName: data.stats.vTeam.leaders.points.players['0'].lastName,
                            points: data.stats.vTeam.leaders.points.value,
                        },
                        rebounds : {
                            firstName: data.stats.vTeam.leaders.rebounds.players['0'].firstName,
                            lastName: data.stats.vTeam.leaders.rebounds.players['0'].lastName,
                            rebounds: data.stats.vTeam.leaders.rebounds.value,
                        },
                        assists : {
                            firstName: data.stats.vTeam.leaders.assists.players['0'].firstName,
                            lastName: data.stats.vTeam.leaders.assists.players['0'].lastName,
                            assists: data.stats.vTeam.leaders.assists.value,
                        },
                    },
                    activePlayers: vTeamActivePlayers
                },
                hTeam: {
                  triCode: data.basicGameData.hTeam.triCode,
                    leaders: {
                        points : {
                            firstName: data.stats.hTeam.leaders.points.players['0'].firstName,
                            lastName: data.stats.hTeam.leaders.points.players['0'].lastName,
                            points: data.stats.hTeam.leaders.points.value,
                        },
                        rebounds : {
                            firstName: data.stats.hTeam.leaders.rebounds.players['0'].firstName,
                            lastName: data.stats.hTeam.leaders.rebounds.players['0'].lastName,
                            rebounds: data.stats.hTeam.leaders.rebounds.value,
                        },
                        assists : {
                            firstName: data.stats.hTeam.leaders.assists.players['0'].firstName,
                            lastName: data.stats.hTeam.leaders.assists.players['0'].lastName,
                            assists: data.stats.hTeam.leaders.assists.value,
                        },
                    },
                    activePlayers: hTeamActivePlayers
                }
            };
    }
        // CREATE OR UPDATE GAMESTATS IN DB
        await GameStats.findOneAndUpdate({_id: _id}, gameStats, {new: true, upsert: true}, function (err) {
            if(err) {
                console.log(`Error occured when find and update gamestats ${err}`);
            } else {
                console.log('Gamestats are updated!');
            }});

        // @TODO GET request returns an empty array on first try
    }

    // SHOW GAME STATS
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.createGameStats(this.gameDate, this.gameId);
            const gameStats = await GameStats.find().exec();
            return res.status(200).json(gameStats);

        } catch(err) {
            next(err);
        }
    }

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { date } = req.params;

            await this.createGameStats(date, id);
            const gameStats = await GameStats.findById(id).exec();
            return res.status(200).json(gameStats);
        } catch(err) {
            next(err);
        }
    }

    sort = async (req: Request, res: Response, next: NextFunction) => {

        // TRY 1

        const { id } = req.params;
        const { date } = req.params;
        await this.createGameStats(date, id);
        const stats = await GameStats.findById(id).sort({'vTeam.activePlayers.points': -1}).exec();
        return res.status(200).json(stats);
        
    }
//         // TRY 2
        
//         // GameStats.find({ _id: '0021900805'} ).sort({'hTeam.activePlayers.points': -1}).exec(function(err, result) {
                
//         //         if(err){
//         //             console.log(err);
//         //         } else {
//         //             return res.status(200).json(result);
//         //         }
//         // }
//         //     );

//         // TRY 3

//         //  GameStats.aggregate(
//         //     [
//         //     // {$match: {'_id': '0021900805'}},
//         //     {$unwind: '$hTeam.activePlayers'},
//         //      {$sort:  {'hTeam.activePlayers.points': 1}}, 
//         //      { $group:{
//         //        "_id": "$hTeam.activePlayers",
//         //              }
//         //      }
//         //     ],
//         //     function(err, result) {
//         //         if(err){
//         //             console.log(err);
//         //         }else {
//         //             return res.status(200).json(result);

//         //         }
//         //     }
//         //  );
//     }
    

// sort = async (req: Request, res: Response, next: NextFunction) => {
    
//     const { id } = req.params;
//     const { date } = req.params;
//     await this.createGameStats(date, id);

//     // const id = "0021900805";
//     const stats = await GameStats.aggregate([
//       {
//         $match: {
//           _id: id, // or mongoose.Types.ObjectId(id)
//         },
//       },
//       {
//         $unwind: "$hTeam.activePlayers",
//       },
//       {
//         $sort: {
//           "hTeam.activePlayers.points": -1,
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           activePlayers: {
//             $push: "$hTeam.activePlayers",
//           },
//           doc: {
//             $first: "$$ROOT",
//           },
//         },
//       },
//       {
//         $replaceRoot: {
//           newRoot: {
//             $mergeObjects: [
//               "$doc",
//               {
//                 hTeamActivePlayers: "$activePlayers",
//               },
//             ],
//           },
//         },
//       },
//       {
//         $addFields: {
//           "hTeam.activePlayers": "$hTeamActivePlayers",
//         },
//       },
//       {
//         $project: {
//           hTeamActivePlayers: 0,
//         },
//       },
//     ]);
  
//     return res.status(200).json(stats);
//   };
}

export default GameStatsController;

