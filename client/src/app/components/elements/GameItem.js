import React, { useState, useEffect } from 'react';
import { useApi } from '../../services';

import classnames from 'classnames';


const GameItem = ({data}) => {
    const { findTeam } = useApi();

    const [vTeamName, setVTeamName ] = useState();
    const [hTeamName, setHTeamName ] = useState();
    const [vUrlName, setVUrlName ] = useState();
    const [hUrlName, setHUrlName] = useState();

    // FETCH DATA
    useEffect(() => {

        const fetchGame = async () => {
            const vTeamData = await findTeam(data.vTeam);
            const hTeamData = await findTeam(data.hTeam);
            setVTeamName(vTeamData.nickname);
            setHTeamName(hTeamData.nickname);
            setVUrlName(vTeamData.urlName);
            setHUrlName(hTeamData.urlName);
        }
        fetchGame();
    }, [])

    return (
        <div className={classnames("row", "o-scores")}>
            <div className={classnames("col-3", "m-logo")}>
                <img className="a-logo" alt="teamlogo" title="teamlogo" src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${vUrlName}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`}></img>
                <span className="a-teamName">{vTeamName}</span>
            </div>
            <div className={classnames("col-2", "m-gameStatus")}>
                <span className="a-teamScore">{data.hTeamScore}</span>
            </div>
            <div className={classnames("col-2", "m-gameStatus")}>
                <span className="a-gameStatus">
                  {data.isStartTimeTBD? 'To Be Determined' : data.startTimeEastern}
                  </span>
            </div>
            <div className={classnames("col-2", "m-gameStatus")}>
                <span className="a-teamScore">{data.vTeamScore}</span>
            </div>
            <div className={classnames("col-3", "m-logo")}>
                <img className="a-logo" alt="teamlogo" title="teamlogo" src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${hUrlName}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`}></img>
                <span className="a-teamName">{hTeamName}</span>
            </div>
        </div>
    )
}

export default GameItem;