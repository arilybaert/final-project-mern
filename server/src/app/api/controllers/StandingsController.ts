import { Request, Response, NextFunction } from 'express';
import { StandingsSeeder } from '../seeder';
import { Standings } from '../../models/mongoose';

class StandingsController {
    private standingsSeeder: StandingsSeeder;

    constructor() {
        this.standingsSeeder = new StandingsSeeder();
    }

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.standingsSeeder.createStandings(this.standingsSeeder.ALLSTANDINGS_URL, this.standingsSeeder.CONFSTANDINGS_URL, this.standingsSeeder.DIVSTANDINGS_URL);
            const standings = await  Standings.find().exec();
            return res.status(200).json(standings);
        } catch (err) {
            next(err);
        }
    }
}

export default StandingsController;