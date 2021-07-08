import React , { useState, useEffect, useContext } from 'react';
import classnames from 'classnames'
import {NBAContext} from '../context';


const Leaders = ({gameStats}) => {
    const { displayHTeam } = useContext(NBAContext);
    
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
                if(gameStats.hTeam.leaders !== undefined){
                    if(displayHTeam === true) {
                        setPoints(gameStats.hTeam.leaders.points.points);
                        setPointsPlayer(`${gameStats.hTeam.leaders.points.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.points.lastName}`);
                        setRebounds(gameStats.hTeam.leaders.rebounds.rebounds);
                        setReboundsPlayer(`${gameStats.hTeam.leaders.rebounds.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.rebounds.lastName}`);
                        setAssists(gameStats.hTeam.leaders.assists.assists);
                        setAssistsPlayer(`${gameStats.hTeam.leaders.assists.firstName.substring(0, 1)}. ${gameStats.hTeam.leaders.assists.lastName}`);
                    } else if (displayHTeam === false) {
                        setPoints(gameStats.vTeam.leaders.points.points);
                        setPointsPlayer(`${gameStats.vTeam.leaders.points.firstName.substring(0, 1)}. ${gameStats.vTeam.leaders.points.lastName}`);
                        setRebounds(gameStats.vTeam.leaders.rebounds.rebounds);
                        setReboundsPlayer(`${gameStats.vTeam.leaders.rebounds.firstName.substring(0, 1)}. ${gameStats.vTeam.leaders.rebounds.lastName}`);
                        setAssists(gameStats.vTeam.leaders.assists.assists);
                        setAssistsPlayer(`${gameStats.vTeam.leaders.assists.firstName.substring(0, 1)}. ${gameStats.vTeam.leaders.assists.lastName}`);
                    }
                }
            }
        }
        setValues();

        
    }, [gameStats, displayHTeam])

    if(status ==='game tbd'){
        return (
            <div className={classnames("row", "o-leaders", "o-bgc")}>
                <div className="col-12">
                    <span>No statistics, Game is yet to be determined</span>
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