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
}

export default GameStatsController;

