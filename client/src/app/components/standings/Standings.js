import React, {useEffect, useState} from 'react';
import classnames from 'classnames';

import { useApi } from '../../services';
import StandingsData from './StandingsData';
const Standings = () => {
    const { findStandings } = useApi();
    
    const [standings, setStandings] = useState();
    // FETCH DATA
    useEffect(( ) => {
        const fetchStandings = async () => {
            const data = await findStandings();
            setStandings(data[0].allStandings);
        }
        fetchStandings();
    }, []);


    return (
        <div className={classnames("row", "o-standings")}>
            <div className={classnames("col-12", "o-tableContainer")}>
                <table className="m-standingsTable">
                    <thead>
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
                            return <StandingsData key={data._id} data={data}/>
                        })
                    }
                    </tbody>
                   
                </table>
            </div>
        </div>
    )
}

export default Standings;