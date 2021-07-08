import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { NBAContext } from '../context';

const LeaguePicker = () => {

    // STATES
    const [leaguePicker, setLeaguePicker] = useState(0);

    // CONTEXT
    const { displayLeague } = useContext(NBAContext);
    const { setDisplayLeague } = useContext(NBAContext);

    // ARRAY
    const league = ['All', 'Conference', 'Division'];


    useEffect(() => {
        setDisplayLeague(league[leaguePicker]);
    }, [leaguePicker])

    // BUTTON HANDLERS
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
                            <IoIosArrowBack size='2em' color='white'/>
                        </div>

                        <div className="col-4">
                            <span className="a-currentDate">{displayLeague}</span>
                        </div>

                        <div className={classnames("col-4", "m-arrow")} onClick={handleRightClick}>
                            <IoIosArrowForward size='2em' color='white'/>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default LeaguePicker;