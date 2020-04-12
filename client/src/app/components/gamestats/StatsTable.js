import React, { useState, useEffect } from 'react';

const StatsTable = ({gameStats}) => {

    const [activeVPlayers, setActiveVPlayers] = useState();
    const [activeHPlayers, setActiveHPlayers] = useState();

    useEffect(() => {
        const setValues = () => {
            if (gameStats !== undefined) {
                setActiveVPlayers(gameStats.vTeam.activePlayers);
                setActiveHPlayers(gameStats.hTeam.activePlayers)
            }
        }
        setValues();
    }, [gameStats]);

    return (
        <div className="row o-table o-bgc">
        <table className="m-table col-12">
            <tr>
                <th></th>
                <th>pt.</th>
                <th>3pt</th>
                <th>%</th>
                <th>stl</th>
                <th>blk</th>
                <th>to</th>
            </tr>   
            {
                    activeHPlayers && activeHPlayers.map((data) => {
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
                                
        </table>
    </div>    
    )
}

export default StatsTable;