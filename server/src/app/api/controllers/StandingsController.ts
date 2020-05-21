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
            const standings = await Standings.find().exec();
            return res.status(200).json(standings);
        } catch (err) {
            next(err);
        }
    }

    /*
    FUNCTION DOESN'T WORK:
    MONGOOSE CAN'T FIND BY ID IN THIS COLLECTION
    */


    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {
  
            const {id} = req.params;
            
            const deleted = await Standings.deleteOne({_id: id}).exec();
            console.log(`deleted: ${id}`);
            console.log(deleted);
            return res.status(200).json(deleted);
  
  
        } catch(err) {
            next(err);
        }
  
    }
    softDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            let standings = await Standings.findById(id)
            standings._deletedAt = Date.now();
            await standings.save();
            return res.status(200).json(standings);
        } catch(err) {
            next(err);
        }
    }
    softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            let standings = await Standings.findById(id)
            standings._deletedAt = null;
            standings.save();
            return res.status(200).json(standings);
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