import { Request, Response, NextFunction } from 'express';
import { default as fetch } from 'node-fetch';
import {  ITeam, Team, teamSchema } from '../../models/mongoose';

class TeamController {
    private teams: Array<ITeam>;

    constructor() {
        this.teams = [];
    }

    teamCreate = async (
        _id: string,
        isNBAFranchise: Boolean,
        isAllStar: Boolean,
        city: string,
        altCityName: string,
        fullName: string,
        tricode: string,
        teamId: string,
        nickname: string,
        logo: string,
        urlName: string,
        teamShortName: string,
        confName: string,
        divName: string,
    ) => {
        const teamDetail = {
            _id,
            isNBAFranchise,
            isAllStar,
            city,
            altCityName,
            fullName,
            tricode,
            teamId,
            nickname,
            logo,
            urlName,
            teamShortName,
            confName,
            divName,
        }

        const team: ITeam = new Team(teamDetail);

        try {
            const createdTeam = await team.save();
            this.teams.push(createdTeam);

            console.log(`team created with id: ${createdTeam._id}`)
        } catch (err) {
            console.log(`An error occured when creating a team ${err}`);
        }
    }
    
    createTeam = async () => {
        const promises = [];

        let data = await this.getTeams();
        console.log(data.league.standard);
        data.league.standard.forEach(function (team) {
        
        const teams: Array<any> = []
        
        const _id = team.teamId;
        const isNBAFranchise = team.isNBAFranchise;
        const isAllStar = team.isAllStar;
        const city = team.city;
        const altCityName = team.altCityName;
        const fullName = team.fullName;
        const tricode = team.tricode;
        const teamId = team.teamId;
        const nickname = team.nickname;
        const urlName = team.urlName;
        const teamShortName = team.teamShortName;
        const confName = team.confName;
        const divName = team.divName

        teams.push({
            _id,
            isNBAFranchise,
            isAllStar,
            city,
            altCityName,
            fullName,
            tricode,
            teamId,
            nickname,
            urlName,
            teamShortName,
            confName,
            divName,
        });

        Team.findOneAndUpdate({_id: _id}, team, {new: true, upsert: true}, function (err) {
            if(err) {
                console.log(`Error occured when find and update teams ${err}`);
            } else {
                console.log('Teams are updated!');
            }});
        });

    };

    getTeams = async () => {
        const url = `http://data.nba.net/10s/prod/v2/2019/teams.json`;
        const response = await fetch(url);
        return response.json();
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.createTeam();
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