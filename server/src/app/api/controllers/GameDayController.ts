import { Request, Response, NextFunction } from 'express';
// import { default as fetch } from 'node-fetch';
// import { default as DateMaker } from '../../utilities/DateMaker';

import { GameDaySeeder } from '../seeder';
import {  IGameDay, IGame, GameDay, Game } from '../../models/mongoose';


class GameDayController {
    private gameDays: Array<IGameDay>;
    private games: Array<IGame>;
    
    private gameDaySeeder: GameDaySeeder;

    // private date: string;

    constructor () {
        this.gameDaySeeder = new GameDaySeeder();
        this.gameDays = [];

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
                    await this.gameDaySeeder.createGamedays(id);
                    const gameday =  await GameDay.findById(id).sort({_createdAt: -1}).exec();
                    return res.status(200).json(gameday);

        } catch(err) {
            next(err);
        }
    }

}

export default GameDayController;