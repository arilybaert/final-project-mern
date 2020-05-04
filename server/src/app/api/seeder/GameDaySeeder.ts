import { default as fetch } from 'node-fetch';


import {  IGameDay, IGame, GameDay, Game } from '../../models/mongoose';

class GameDaySeeder {
    constructor(){

    }
        // CREATE EMPTY GAMEDAY
        gameDayCreate = async (
            _id: string,
            games: Array<IGame>,
          ) => {
            const gameDayDetail = {
              _id,
              games,
            };
      
            const gameDay: IGameDay = new GameDay(gameDayDetail);
      
            try {
              const createdGameDay = await gameDay.save();
              this.gameDays.push(createdGameDay);
      
              console.log(`Gameday created with id: ${createdGameDay._id}`, {});
            } catch (err) {
              console.log(`An error occurred when creating a gameday ${err}`, err);
            }
          };
      
          // FILL GAMEDAYS
          createGamedays = async (date: any, id?: any) => {
              const promises = [];
              const games: Array<any> = [];
              let data = await this.getGames(date);
              data.games.forEach(function (game) {
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
                
                games.push({
                  _id,
                  isStartTimeTBD,
                  isGameActivated,
                  startTimeEastern,
                  startDateEastern,
                  startTimeISO,
                  vTeam,
                  vTeamTricode,
                  vTeamScore,
                  hTeam,
                  hTeamTricode,
                  hTeamScore,
        });
              })
      
              await GameDay.countDocuments({_id: date}).exec().then(async (count) => { 
    
                if(count>0){
                console.log('file found');      
                const temp = {
                    'games': games,
                  }
                  await GameDay.findOneAndUpdate({_id: id}, temp, {new: true, upsert: false}, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('game updated');
                })
                    .catch(err => console.log(err));
                } else {
    
                    console.log('game created');
    
                  promises.push(
                    this.gameDayCreate(
                      date,
                      games,
                    ),
                  );
                  return await Promise.all(promises);
                }
              })
            };
      
          // GET GAMES FROM API
          getGames = async (date: string) => {
            const url = `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`;
            const response = await fetch(url);
            return response.json();
          }
}

export default GameDaySeeder;