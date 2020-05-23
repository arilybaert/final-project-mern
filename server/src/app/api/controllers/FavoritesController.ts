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

}

export default FavoritesController;