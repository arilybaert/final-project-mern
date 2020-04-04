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
        createGameStats = async () => {
            const vTeamActivePlayers: Array<any> = []
            const hTeamActivePlayers: Array<any> = []
            
            let data = await this.getGameStats(this.gameDate, this.gameId);
            
            const vTeamId = data.basicGameData.vTeam.teamId;
            const hTeamId = data.basicGameData.hTeam.teamId;
            const _id = data.basicGameData.gameId;

            data.stats.activePlayers.forEach(function (activePlayer)  {
                if(activePlayer.teamId === vTeamId) {
                    const playerId = activePlayer.personId;
                    const teamId = activePlayer.teamId;
                    const firstName = activePlayer.firstName;
                    const lastName = activePlayer.lastName;
                    const points = String(activePlayer.sortKey.points + activePlayer.sortKey.ftm);
                    const tpm = activePlayer.tmp;
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
                    const points = String(activePlayer.sortKey.points + activePlayer.sortKey.ftm);
                    const tpm = activePlayer.tmp;
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

            const gameStats = {
                startTimeUTC: data.basicGameData.startTimeUTC,
                startTimeEastern: data.basicGameData.startTimeEastern,
                isStartTimeTBD: data.basicGameData.isStartTimeTBD,
                vTeamScore: data.basicGameData.vTeam.score,
                hTeamScore: data.basicGameData.hTeam.score,
                vTeam: {
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

            // CREATE OR UPDATE GAMESTATS IN DB
            GameStats.findOneAndUpdate({_id: _id}, gameStats, {new: true, upsert: true}, function (err) {
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
                await this.createGameStats();
                const gameStats = await GameStats.find().exec();
                return res.status(200).json(gameStats);
    
            } catch(err) {
                next(err);
            }
        }
}

export default GameStatsController;

