import React, { useState, useEffect, useContext } from 'react';
import {NBAContext} from '../context';

const StatsTable = ({gameStats}) => {
    const { displayHTeam } = useContext(NBAContext);
    
    const [status, setStatus] = useState();
    const [activeVPlayers, setActiveVPlayers] = useState();
    const [activePlayers, setActivePlayers] = useState();

    // Depending on selected Team save the Active player on Home or Away Team

    useEffect(() => {
        const setValues = () => {
            if (gameStats !== undefined) {
                setStatus(gameStats.status);
                if(displayHTeam === true) {
                    // HOME PLAYERS
                    setActivePlayers(gameStats.hTeam.activePlayers)
                } else if (displayHTeam === false) {
                    // AWAY PLAYERS
                    setActivePlayers(gameStats.vTeam.activePlayers);

                }
            }
        }
        setValues();
    }, [gameStats, displayHTeam]);

    /*
    Check if the game statistics are available and display them. If the game isn't played yet or 'is yet to be determined due to external factors display an client friendly message to inform them.
    */

    if (status ==='game'){
        return (
            <div className="row o-table o-bgc">
            <table className="m-table col-12">
                <thead>
                <tr>
                    <th></th>
                    <th>pt.</th>
                    <th>3pt</th>
                    <th>%</th>
                    <th>stl</th>
                    <th>blk</th>
                    <th>to</th>
                </tr>   
                </thead>
                <tbody>
                {
                        activePlayers && activePlayers.map((data) => {
                                return (<tr>
                                            <td>{`${data.firstName.substring(0, 1)}. ${data.lastName}`}</td>
                                            <td>{data.points}</td>
                                            <td>{data.tpm}</td>
                                            <td>{data.fgp}</td>
                                            <td>{data.stl}</td>
                                            <td>{data.blk}</td>
                                            <td>{data.to}</td>
                                        </tr>)
                        })
                    }
                </tbody>
                                    
            </table>
        </div>    
        )

    }

    else if(status ==='game tbd') {
        return (
            <div className="row"></div>
        );
    }

    else {
        return (
            <div></div>
        )
    }
    
}

export default StatsTable;