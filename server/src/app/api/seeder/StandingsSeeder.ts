import { default as fetch } from 'node-fetch';
import { IStandings, Standings } from '../../models/mongoose';

class StandingsSeeder {
    private standings: Array<any>;

    public ALLSTANDINGS_URL: string;
    public CONFSTANDINGS_URL: string;
    public DIVSTANDINGS_URL: string;
    
    constructor () {

        this.standings = [];
        this.ALLSTANDINGS_URL = 'http://data.nba.net/10s/prod/v1/current/standings_all.json';
        this.CONFSTANDINGS_URL = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json';
        this.DIVSTANDINGS_URL = 'http://data.nba.net/10s/prod/v1/current/standings_division.json';
    }

    // GET DATA FROM API
    getStandings = async (link: string) => {
        const url = link;
        const response = await fetch(url);
        return response.json();
    }
    

    // STANDINGS MOLD
    standingsCreate = async (
        _id: string,
        seasonYear: Number,
        allStandings: Array<any>,
    ) => {
        const standingsDetail = {
            _id,
            seasonYear,
            allStandings,
        }
        const standings: IStandings = new Standings(standingsDetail);

        try {
            const createdStandings = await standings.save();
            this.standings.push(createdStandings);

            console.log('standings created');
        } catch (err) {
            console.log('Error when creating STANDINGS');
        }
    }

    // FILL STANDINGS WITH DATA
    createStandings = async (urlAll: string, urlConf: string, urlDiv: string) => {

        const allStandings: Array<any> = [];
        
        const confEastStandings: Array<any> = [];
        const confWestStandings: Array<any> = [];
        
        const southeastStandings: Array<any> = [];
        const atlanticStandings: Array<any> = [];
        const centralStandings: Array<any> = [];
        const southwestStandings: Array<any> = [];
        const pacificStandings: Array<any> = [];
        const northwestStandings: Array<any> = [];

        // FETCH DATA FROM API
        let all = await this.getStandings(urlAll);
        let conf = await this.getStandings(urlConf);
        let div = await this.getStandings(urlDiv)

        const seasonYear = all.league.standard.seasonYear;

        /*
        FILLING ALL THE STANDINGS WITH DATA FROM API 
        */

        // ALL STANDINGS
        all.league.standard.teams.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const confRank = team.confRank;
            const defaultOrder = team.sortKey.defaultOrder;

            allStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                confRank,
                defaultOrder,
            })
        });
        // DIVISION STANDINGS
        div.league.standard.conference.east.southeast.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            southeastStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        div.league.standard.conference.east.atlantic.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            atlanticStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        div.league.standard.conference.east.central.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            centralStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        div.league.standard.conference.west.southwest.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            southwestStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        div.league.standard.conference.west.pacific.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            pacificStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        div.league.standard.conference.west.northwest.forEach(function(team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const divRank = team.divRank;

            northwestStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                divRank,
            })
        });
        // CONFERENCE STANDINGS
        conf.league.standard.conference.east.forEach(function (team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const confRank = team.confRank;

            confEastStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                confRank,
            })
        })
        conf.league.standard.conference.west.forEach(function (team) {
            const teamId = team.teamId;
            const win = team.win;
            const loss = team.loss;
            const winPctV2 = team.winPctV2;
            const teamName = team.teamSitesOnly.teamName;
            const confRank = team.confRank;

            confWestStandings.push({
                teamId,
                win,
                loss,
                winPctV2,
                teamName,
                confRank,
            })
        })

        // SAVE STANDINGS IN TEMP VARIABLE
        const standings = {
            seasonYear: seasonYear,
            allStandings: allStandings,
            conferenceStandings: {
                east: confEastStandings,
                west: confWestStandings,
            },
            divisionStandings: {
                southeast: southeastStandings,
                atlantic: atlanticStandings,
                central: centralStandings,
                southwest: southwestStandings,
                pacific: pacificStandings,
                northwest: northwestStandings,
            }
        }

        /*
        SAVING DATA IN MONGO DB 
        */

        // CREATE OR UPDATE STANDINGS DEPENDING ON SEASONYEAR
        await Standings.findOneAndUpdate({seasonYear: seasonYear}, standings, {new: true, upsert: true}, function (err) {
            if(err) {
                console.log('Error when updating standings');
            } else {
                console.log('stadings are created / updated');
            }
        } )
    }
}

export default StandingsSeeder;
