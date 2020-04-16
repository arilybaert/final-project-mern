import React, { useState, useEffect } from 'react';
import classnames from 'classnames';


const LeaguePicker = () => {

const [displayLeague, setDisplayLeague] = useState('All');
const league = ['All', 'Conference', 'Division'];
const [leaguePicker, setLeaguePicker] = useState(0);
useEffect(() => {
    setDisplayLeague(league[leaguePicker]);
}, [leaguePicker])


const handleLeftClick = () => {
    if (leaguePicker === 0) {
        setLeaguePicker(2)
    } else {
        setLeaguePicker(leaguePicker-1);
    }
    

}

const handleRightClick = () => {
    if (leaguePicker === 2) {
        setLeaguePicker(0)
    } else {
        setLeaguePicker(leaguePicker+1);

    }
}


return (
        <div className="row">
            <div className={classnames("col-12", "o-datePicker")}>
                <div className="row">

                    <div className={classnames("col-4", "m-arrow")} onClick={handleLeftClick}>
                        <img  title="arrow" alt="arrow" className={classnames("a-arrow", "a-arrow__transform")}></img>
                    </div>

                    <div className="col-4">
                        <span className="a-currentDate">{displayLeague}</span>
                    </div>

                    <div className={classnames("col-4", "m-arrow")} onClick={handleRightClick}>
                        <img  title="arrow" alt="arrow" className="a-arrow"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaguePicker;