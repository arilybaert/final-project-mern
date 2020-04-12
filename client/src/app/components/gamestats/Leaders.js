import React , { useState, useEffect } from 'react';
import classnames from 'classnames'


const Leaders = ({gameStats}) => {
    const [points, setPoints] = useState();
    const [pointsPlayer, setPointsPlayer] = useState();
    const [rebounds, setRebounds] = useState();
    const [reboundsPlayer, setReboundsPlayer] = useState();
    const [assists, setAssists] = useState();
    const [assitsPlayer, setAssistsPlayer] = useState();
    const [status, setStatus] = useState();
    
    useEffect( () => {
        const setValues = () => {
            if(gameStats !== undefined) {
                setStatus(gameStats.status);
                console.log(gameStats.status);
                if(gameStats.hTeam.leaders !== undefined){
                    setPoints(gameStats.hTeam.leaders.points.points);
                    setPointsPlayer(`${gameStats.hTeam.leaders.points.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.points.lastName}`);
                    setRebounds(gameStats.hTeam.leaders.rebounds.rebounds);
                    setReboundsPlayer(`${gameStats.hTeam.leaders.rebounds.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.rebounds.lastName}`);
                    setAssists(gameStats.hTeam.leaders.assists.assists);
                    setAssistsPlayer(`${gameStats.hTeam.leaders.assists.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.assists.lastName}`);
                }
            }
        }
        setValues();

        
    }, [gameStats])

    if(status ==='game tbd'){
        return (
            <div className={classnames("row", "o-leaders", "o-bgc")}>
                <div className="col-12">
                    <span>No statistics, Game is to be determined</span>
                </div>
            </div>
        )
    } else {


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
}

export default Leaders;