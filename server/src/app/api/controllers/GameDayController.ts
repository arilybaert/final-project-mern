import { Request, Response, NextFunction } from 'express';
import { default as fetch } from 'node-fetch';
import { default as DateMaker } from '../../utilities/DateMaker';

import { ILogger } from '../../services/logger';
import {  IGameDay, IGame, GameDay, Game } from '../../models/mongoose';


class GameDayController {
    private gameDays: Array<IGameDay>;
    private logger: ILogger;
    private games: Array<IGame>;

    private date: string;

    constructor () {
        this.gameDays = [];
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
      createGamedays = async (date: string = DateMaker.date(), id?: string) => {
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
  
            if (id){
              const temp = {
                'games': games,
              }
              GameDay.findOneAndUpdate({_id: id}, temp, {new: true, upsert: false}, function (err) {
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
        };
  
      // GET GAMES FROM API
      getGames = async (date: string) => {
        const url = `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`;
        const response = await fetch(url);
        return response.json();
      }
  
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const games = await GameDay.find().sort({_createdAt: -1}).exec();
            return res.status(200).json(games);
        } catch (err) {
            next(err);
        }
    }
    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // const gameday = await  GameDay.findById(id).sort({_createdAt: -1}).exec();
            // return res.status(200).json(gameday);
                    await this.createGamedays(id, id);
                    const gameday =  await GameDay.findById(id).sort({_createdAt: -1}).exec();
                    return res.status(200).json(gameday);

        } catch(err) {
            next(err);
        }
    }

}

export default GameDayController;