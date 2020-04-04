import React , { useState, useEffect } from 'react';
import classnames from 'classnames'


const Leaders = ({gameStats}) => {
    const [points, setPoints] = useState();
    const [pointsPlayer, setPointsPlayer] = useState();
    const [rebounds, setRebounds] = useState();
    const [reboundsPlayer, setReboundsPlayer] = useState();
    const [assists, setAssists] = useState();
    const [assitsPlayer, setAssistsPlayer] = useState();
    
    useEffect( () => {
        console.log(gameStats);
        const setValues = async () => {
            if(gameStats != undefined) {
                setPoints(gameStats.hTeam[0].leaders[0].points[0].points);
                setPointsPlayer(`${gameStats.hTeam[0].leaders[0].points[0].firstName.substring(0, 1)}. ${gameStats.hTeam[0].leaders[0].points[0].lastName}`);
                setRebounds(gameStats.hTeam[0].leaders[0].rebounds[0].rebounds);
                setReboundsPlayer(`${gameStats.hTeam[0].leaders[0].rebounds[0].firstName.substring(0, 1)}. ${gameStats.hTeam[0].leaders[0].rebounds[0].lastName}`);
                setAssists(gameStats.hTeam[0].leaders[0].assists[0].assists);
                setAssistsPlayer(`${gameStats.hTeam[0].leaders[0].assists[0].firstName.substring(0, 1)}. ${gameStats.hTeam[0].leaders[0].assists[0].lastName}`);
            }
        }
        setValues()

    }, [gameStats])
    return (
        <div className={classnames("row", "o-leaders", "o-bgc")}>
            <div className="col-4">
                <div className="row">
                    <div className="col-12">Points</div>
                    <div className={classnames("col-12", "a-leader__score")}>{points}</div>
    <div className="col-12">{pointsPlayer}</div>
                </div>
            </div>
            <div className="col-4">
                <div className="row">
                    <div className="col-12">Assists</div>
                    <div className={classnames("col-12", "a-leader__score")}>{rebounds}</div>
                    <div className="col-12">{reboundsPlayer}</div>
                </div>
            </div>
            <div className="col-4">
                <div className="row">
                    <div className="col-12">Rebounds</div>
                    <div className={classnames("col-12", "a-leader__score")}>{assists}</div>
                    <div className="col-12">{assitsPlayer}</div>
                </div>
            </div>
        </div>
    )
}

export default Leaders;