import { Request, Response, NextFunction } from 'express';


import { GameDaySeeder } from '../seeder';
import {  GameDay } from '../../models/mongoose';


class GameDayController {
    
    private gameDaySeeder: GameDaySeeder;

    constructor () {
        this.gameDaySeeder = new GameDaySeeder();
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
    
    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            GameDay.deleteOne({_id: id}).exec();
            console.log(`deleted: ${id}`);

        } catch(err) {
            next(err);
        }
    }

    softDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            GameDay.softdelete({_id: id}).exec();
            console.log(`deleted: ${id}`);

        } catch(err) {
            next(err);
        }
    }
}

export default GameDayController;