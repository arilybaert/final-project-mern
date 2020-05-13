import { Request, Response, NextFunction } from 'express';
import { StandingsSeeder } from '../seeder';
import { Standings } from '../../models/mongoose';

class StandingsController {
    private standingsSeeder: StandingsSeeder;

    constructor() {
        this.standingsSeeder = new StandingsSeeder();
    }

    // THIS FINDS AND UPDATES THE STANDINGS WITH THE OFFICIAL NBA-API
    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.standingsSeeder.createStandings(this.standingsSeeder.ALLSTANDINGS_URL, this.standingsSeeder.CONFSTANDINGS_URL, this.standingsSeeder.DIVSTANDINGS_URL);
            const standings = await  Standings.find().exec();
            return res.status(200).json(standings);
        } catch (err) {
            next(err);
        }
    }

    /*
    FUNCTION DOESN'T WORK:
    CAN'T FIND A WAY TO DELETE A SPEFIC SUBDOCUMENT (ARRAY) IN THE STANDINGS COLLECTION
    */

    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            const deleted = await Standings.findById("5e9712673107205c65e46f97").exec();
            return res.status(200).json(deleted);


        } catch(err) {
            next(err);
        }

    }

    // softDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let standings = await Standings.findById(id)
    //         standings._deletedAt = Date.now();
    //         await standings.save();
    //         return res.status(200).json(standings);
    //     } catch(err) {
    //         next(err);
    //     }
    // }
    // softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let standings = await Standings.findById(id)
    //         standings._deletedAt = null;
    //         standings.save();
    //         return res.status(200).json(standings);
    //     } catch(err) {
    //         next(err);
    //     }
    // }
}

export default StandingsController;