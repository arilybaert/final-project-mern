import { Request, Response, NextFunction } from 'express';

import {  Team } from '../../models/mongoose';
import { TeamSeeder } from '../seeder';

class TeamController {

    private teamSeeder: TeamSeeder

    constructor () {
        this.teamSeeder = new TeamSeeder()
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.teamSeeder.createTeam();
            const teams = await Team.find().exec();
            return res.status(200).json(teams);

        } catch(err) {
            next(err);
        }
    }

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const post = await Team.findById(id).exec();
            return res.status(200).json(post);
        } catch(err) {
            next(err);
        }
    }

    showAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Team.find().exec();
            return res.status(200).json(post);
        } catch(err) {
            next(err);
        }
    }

    hardDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            const deleted = await Team.deleteOne({_id: id}).exec();
            console.log(`deleted: ${id}`);
            return res.status(200).json(deleted);
        } catch(err) {
            next(err);
        }
    }

    softDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            let team = await Team.findById(id)
            team._deletedAt = Date.now();
            await team.save();
            return res.status(200).json(team);
        } catch(err) {
            next(err);
        }
    }

    softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            let team = await Team.findById(id)
            team._deletedAt = null;
            team.save();
            return res.status(200).json(team);
        } catch(err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.body.Id;
    
            const data = {
              '_id': req.body.Id,
              'city': req.body.City,
              'nickname': req.body.Nickname,
              'triCode': req.body.triCode,
              '_modifiedAt': Date.now(),
            };
    
            const team = await Team.findOneAndUpdate({_id: id}, data, {new: false});
            team.save();
            return res.status(200).json(team);
    
        } catch(err) {
            next(err);
        }
    }
};

export default TeamController;