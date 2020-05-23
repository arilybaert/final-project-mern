import { Request, Response, NextFunction } from 'express';


import {  Favorites } from '../../models/mongoose';


class FavoritesController {


    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favorites = await Favorites.find().sort({_createdAt: -1}).exec();
            return res.status(200).json(favorites);
        } catch (err) {
            next(err);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const teams = req.body.teams;

            var resultArray = Object.keys(teams).map(function(personNamedIndex){
                let team = teams[personNamedIndex];
                // do something with person
                return team;
            });

            let f = new Favorites({_id: req.body._id, teams: resultArray})
            await f.save();

            // return res.status(200).json(f);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    // show = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { id } = req.params;
    //         // const gameday = await  GameDay.findById(id).sort({_createdAt: -1}).exec();
    //         // return res.status(200).json(gameday);
    //                 await this.gameDaySeeder.createGamedays(id);
    //                 const gameday =  await Favorites.findById(id).sort({_createdAt: -1}).exec();
    //                 console.log('gamedauu')
    //                 return res.status(200).json(gameday);

    //     } catch(err) {
    //         // next(err);
    //         return res.status(200).json(false);

    //     }
    // }
    
    // hardDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         Favorites.deleteOne({_id: id}).exec();
    //         console.log(`deleted: ${id}`);

    //     } catch(err) {
    //         next(err);
    //     }

    // }

    // softDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let favorites = await Favorites.findById(id)
    //         favorites._deletedAt = Date.now();
    //         await favorites.save();
    //         return res.status(200).json(favorites);
    //     } catch(err) {
    //         next(err);
    //     }
    // }
    // softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         const { id } = req.params;
    //         let favorites = await Favorites.findById(id)
    //         favorites._deletedAt = null;
    //         favorites.save();
    //         return res.status(200).json(favorites);
    //     } catch(err) {
    //         next(err);
    //     }
    // }

    // // PROBLEM CANNOT UPDATE PRIMARY KEY
    // update = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         console.log(req.body.GamedayDate);
    //         const id = req.body.Id;
    
    //         const data = {
    //           '_id': req.body.GamedayDate,
    //           '_modifiedAt': Date.now(),
    //         };
    
    //         const favorites = await Favorites.findOneAndUpdate({_id: id}, data, {new: true});
    //         console.log(favorites);
    //         return res.status(200).json(favorites);
    
    //     } catch(err) {
    //         next(err);
    //     }
    // }
}

export default FavoritesController;