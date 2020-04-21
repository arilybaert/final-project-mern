import React, {useEffect, useState, useContext} from 'react';
import classnames from 'classnames';

import { useApi } from '../../services';
import {AllLeagueData, ConferenceLeagueData, DivisionLeagueStandings} from './Leagues';
import { NBAContext } from '../context';


const Standings = () => {
    const ALL_LEAGUE = 'All';
    const CONFERENCE_LEAGUE = 'Conference';
    const DIVISION_LEAGUE = 'Division';
    const { findStandings } = useApi();

    const [standings, setStandings] = useState();

    const [confEastStandings, setConfEastStandings] = useState();
    const [confWestStandings, setConfWestStandings] = useState();

    const [divSEStandings, setDivSEStandings] = useState();
    const [divATLStandings, setDivATLStandings] = useState();
    const [divCENStandings, setDivCENStandings] = useState();
    const [divSWStandings, setDivSWStandings] = useState();
    const [divPACtandings, setDivPACStandings] = useState();
    const [divNWtandings, setDivNWStandings] = useState();
    const { displayLeague } = useContext(NBAContext);


    // FETCH DATA
    useEffect(( ) => {
        const fetchStandings = async () => {
            const data = await findStandings();

            console.log(data);
                setStandings(data[0].allStandings);
                setConfEastStandings(data[0].conferenceStandings.east);
                setConfWestStandings(data[0].conferenceStandings.west);
                setDivSEStandings(data[0].divisionStandings.southeast);
                setDivATLStandings(data[0].divisionStandings.atlantic);
                setDivCENStandings(data[0].divisionStandings.central);
                setDivSWStandings(data[0].divisionStandings.southwest);
                setDivPACStandings(data[0].divisionStandings.pacific);
                setDivNWStandings(data[0].divisionStandings.northwest);
        }
        fetchStandings();
    }, []);


    if(displayLeague === ALL_LEAGUE) {
        return (
            <div className={classnames("row", "o-standings")}>
                <div className={classnames("col-12", "o-tableContainer")}>
                    <table className="m-standingsTable">
                        <thead >
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>ALL</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            standings && standings.map((data) => {
                                return <AllLeagueData key={data._id} data={data}/>
                            })
                        }
                        </tbody>
                       
                    </table>
                </div>
            </div>
        )
    } else if (displayLeague === CONFERENCE_LEAGUE) {
        return (
            <div className={classnames("row", "o-standings")}>
                <div className={classnames("col-12", "o-tableContainer")}>
                    <table className="m-standingsTable">
                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>EAST</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            confEastStandings && confEastStandings.map((data) => {
                                return <ConferenceLeagueData key={data._id} data={data}/>
                            })
                        }
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>WEST</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            confWestStandings && confWestStandings.map((data) => {
                                return <ConferenceLeagueData key={data._id} data={data}/>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }else if (displayLeague === DIVISION_LEAGUE) {
        return (
            <div className={classnames("row", "o-standings")}>
                <div className={classnames("col-12", "o-tableContainer")}>
                    <table className="m-standingsTable">

                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>SOUTH EAST</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divSEStandings && divSEStandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>ATLANTIC</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divATLStandings && divATLStandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>

                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>CENTRAL</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divCENStandings && divCENStandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>

                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>SOUTH WEST</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divSWStandings && divSWStandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>

                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>PACIFIC</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divPACtandings && divPACtandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>

                        <thead>
                            <tr>
                                <th colSpan='6' className={classnames('a-leagueTitle', 'm-tableHead')}>NORTH WEST</th>
                            </tr>
                            <tr>
                                <th>P</th>
                                <th>Logo</th>
                                <th>Teams</th>
                                <th>W</th>
                                <th>L</th>
                                <th>%</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            divNWtandings && divNWtandings.map((data) => {
                                return <DivisionLeagueStandings key={data.teamId} data={data}/>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Standings;