import React from 'react';
import classnames from 'classnames';

const FavoGameItem = () => {

    return (
        <div className={classnames("row", "o-scores")}>
            <div className={classnames("col-4", "m-logo")}>
                <img className="a-logo" alt="teamlogo" title="teamlogo"></img>
                <span className="a-teamName">Pistons</span>
            </div>
            <div className={classnames("col-1", "m-gameStatus")}>
                <span className="a-teamScore">137</span>
            </div>
            <div className={classnames("col-2", "m-gameStatus")}>
                <span className="a-gameStatus">
                Final
                </span>
            </div>
            <div className={classnames("col-1", "m-gameStatus")}>
                <span className="a-teamScore">177</span>
            </div>
            <div className={classnames("col-4", "m-logo")}>
                <img className="a-logo" alt="teamlogo" title="teamlogo"></img>
                <span className="a-teamName">Lakers</span>
            </div>
        </div>
    )
}

export default FavoGameItem;