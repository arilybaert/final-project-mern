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
        const setValues = () => {
            if(gameStats !== undefined) {
                setPoints(gameStats[0].hTeam.leaders.points.points);
                setPointsPlayer(`${gameStats[0].hTeam.leaders.points.firstName.substring(0, 1)}. ${gameStats[0].hTeam.leaders.points.lastName}`);
                setRebounds(gameStats[0].hTeam.leaders.rebounds.rebounds);
                setReboundsPlayer(`${gameStats[0].hTeam.leaders.rebounds.firstName.substring(0, 1)}. ${gameStats[0].hTeam.leaders.rebounds.lastName}`);
                setAssists(gameStats[0].hTeam.leaders.assists.assists);
                setAssistsPlayer(`${gameStats[0].hTeam.leaders.assists.firstName.substring(0, 1)}. ${gameStats[0].hTeam.leaders.assists.lastName}`);
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