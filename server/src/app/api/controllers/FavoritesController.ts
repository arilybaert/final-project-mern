import { Request, Response, NextFunction } from 'express';


import {  Favorites } from '../../models/mongoose';


class FavoritesController {


    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favorites = await Favorites.find().exec();
            console.log(favorites);
            return res.status(200).json(favorites);
        } catch (err) {
            next(err);
        }
    }

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const favorites = await Favorites.findById(id).exec();
            return res.status(200).json(favorites);
        } catch (err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;

            const update = await Favorites.findOneAndUpdate({ _id: id }, { $set: {teams: req.body}})
        

        } catch (err) {
            console.log(err);
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


    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {
      
            const { id } = req.params;
            const deleted = await Favorites.deleteOne({_id: id}).exec();
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
        let favorite = await Favorites.findById(id)
        favorite._deletedAt = Date.now();
        await favorite.save();
        return res.status(200).json(favorite);
    } catch(err) {
        next(err);
    }
  }
  softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
  
        const { id } = req.params;
        let favorite = await Favorites.findById(id)
        favorite._deletedAt = null;
        favorite.save();
        return res.status(200).json(favorite);
    } catch(err) {
        next(err);
    }
  }
}

export default FavoritesController;