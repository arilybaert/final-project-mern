import React from 'react';
import classnames from 'classnames';

const TeamScores = () => {


    return(
        <div className={classnames("row", "o-mainStat", "o-gameStats")}>
            <div className="col-6 m-mainStat">

                <span className="a-score">
                     score vTeam
                </span>
                <span className="a-teamLocation">
                Away
                </span>


            </div>
            <div className={classnames("col-6", "m-mainStat", "o-bgc")}>

                <span className="a-score">
                    score hTeam

                </span>
                <span className="a-teamLocation">
                Home
                </span>

            </div>
        </div>
    )
}

export default TeamScores;