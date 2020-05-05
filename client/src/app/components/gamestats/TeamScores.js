import React , { useState, useEffect } from 'react';
import classnames from 'classnames';

import { useApi } from '../../services/';

const TeamScores = ({gameStats}) => {
    const { findTeam } = useApi();

    const [hTeamName, setHTeamName] = useState();
    const [vTeamName, setVTeamName] = useState();
    const [hTeamScore, setHTeamScore] = useState();
    const [vTeamScore, setVTeamScore] = useState();

    useEffect( () => {
        const setValues = async () => {
            if(gameStats !== undefined) {
                const vTeamData = await findTeam(gameStats.vTeam.teamId);
                const hTeamData = await findTeam(gameStats.hTeam.teamId);
                console.log(vTeamData.urlName);
                setVTeamName(vTeamData.urlName);
                setHTeamName(hTeamData.urlName);
                setHTeamScore(gameStats.hTeamScore);
                setVTeamScore(gameStats.vTeamScore);
            }
        }
        setValues()

    }, [gameStats])

    return(
        <div className={classnames("row", "o-mainStat", "o-gameStats")}>
            <div className="col-6 m-mainStat">
                <img src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${hTeamName}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`} alt="hTeamPhoto" class="a-logo"></img>
                <span className="a-score">
                     {hTeamScore}
                </span>
                <span className="a-teamLocation">
                    Home
                </span>


            </div>
            <div className={classnames("col-6", "m-mainStat", "o-bgc")}>
                <img src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${vTeamName}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`} alt="hTeamPhoto" class="a-logo"></img>
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