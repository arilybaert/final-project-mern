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
};

export default TeamController;