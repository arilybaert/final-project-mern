import { Request, Response, NextFunction } from 'express';

import { IGameStats, GameStats, gameStatsSchema } from '../../models/mongoose';
import { GameStatsSeeder } from '../seeder';

class GameStatsController {
    private gameDate: string;
    private gameId: string;
    private gameStatsSeeder: GameStatsSeeder;


    constructor() {
        this.gameDate = '20200211';
        this.gameId = '0021900802';

        this.gameStatsSeeder = new GameStatsSeeder();

    }

    // SHOW GAME STATS
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.gameStatsSeeder.createGameStats(this.gameDate, this.gameId);
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

            await this.gameStatsSeeder.createGameStats(date, id);
            const gameStats = await GameStats.findById(id).exec();
            return res.status(200).json(gameStats);
        } catch(err) {
            next(err);
        }
    }

    sort = async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const { date } = req.params;
        await this.gameStatsSeeder.createGameStats(date, id);
        const stats = await GameStats.findById(id).sort({'vTeam.activePlayers.points': -1}).exec();
        return res.status(200).json(stats);
        
    }

    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.params);
            console.log('hey');
            
            // console.log(`deleted: ${id}`);
            // const deleted = await GameStats.deleteOne({_id: id}).exec();
            // console.log(deleted)
            return res.status(200).json(req.params);
  
  
        } catch(err) {
            console.log(err);
            next(err);
        }
  
    }
    // softDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let gameStats = await GameStats.findById(id)
    //         gameStats._deletedAt = Date.now();
    //         await gameStats.save();
    //         return res.status(200).json(gameStats);
    //     } catch(err) {
    //         next(err);
    //     }
    // }
    // softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let gameStats = await GameStats.findById(id)
    //         gameStats._deletedAt = null;
    //         gameStats.save();
    //         return res.status(200).json(gameStats);
    //     } catch(err) {
    //         next(err);
    //     }
    // }
}

export default GameStatsController;

