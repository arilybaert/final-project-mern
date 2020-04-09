import React , { useState, useEffect } from 'react';
import classnames from 'classnames';

const TeamScores = ({gameStats}) => {
    const [hTeamScore, setHTeamScore] = useState();
    const [vTeamScore, setVTeamScore] = useState();

    
    useEffect( () => {
        const setValues = async () => {
            if(gameStats !== undefined) {
                setHTeamScore(gameStats.hTeamScore);
                setVTeamScore(gameStats.vTeamScore);
            }
        }
        setValues()

    }, [gameStats])

    return(
        <div className={classnames("row", "o-mainStat", "o-gameStats")}>
            <div className="col-6 m-mainStat">

                <span className="a-score">
                     {hTeamScore}
                </span>
                <span className="a-teamLocation">
                    Home
                </span>


            </div>
            <div className={classnames("col-6", "m-mainStat", "o-bgc")}>

                <span className="a-score">
                    {vTeamScore}

                </span>
                <span className="a-teamLocation">
                    Away
                </span>

            </div>
        </div>
    )
}

export default TeamScores;