import { default as fetch } from 'node-fetch';
import {  ITeam, Team } from '../../models/mongoose';

class TeamSeeder {

    private teams: Array<ITeam>;
    private TEAMS_URL: string;

    constructor() {
        this.teams = [];
        this.TEAMS_URL = 'http://data.nba.net/10s/prod/v2/2019/teams.json';
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
        const url = `${this.TEAMS_URL}`;
        const response = await fetch(url);
        return response.json();
    }
}

export default TeamSeeder;