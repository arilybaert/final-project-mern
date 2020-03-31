import React from 'react';
import classnames from 'classnames';


const GameItem = ({data}) => {

    return (
        <div className={classnames("row", "o-scores")}>
            <div className={classnames("col-3", "m-logo")}>
                <img className="a-logo" alt="teamlogo" title="teamlogo"></img>
                <span className="a-teamName">{data.hTeamTricode}</span>
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
                <img className="a-logo" alt="teamlogo" title="teamlogo"></img>
                <span className="a-teamName">{data.vTeamTricode}</span>
            </div>
        </div>
    )
}

export default GameItem;