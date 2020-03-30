import { Request, Response, NextFunction } from 'express';
import { IGameDay, GameDay } from '../../models/mongoose';

class GameDayController {
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
            const gameday = await  GameDay.findById(id).sort({_createdAt: -1}).exec();
            return res.status(200).json(gameday);
        } catch(err) {
            next(err);
        }
    }
}

export default GameDayController;