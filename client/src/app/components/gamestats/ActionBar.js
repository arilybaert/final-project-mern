import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ActionBar = ({gameStats}) => {

    const [vTeamTriCode, setVTeamTriCode ] = useState();
    const [hTeamTriCode, setHTeamTriCode ] = useState();

    useEffect(() => {
        const setValues = () => {
            if(gameStats !== undefined) {
                setVTeamTriCode(gameStats.vTeam.triCode);
                setHTeamTriCode(gameStats.hTeam.triCode);
            }
        };
        setValues();
    },[gameStats]);


    return (
        <div className="row o-bgc">
        <div className="col-12 o-actionbar">
            <div className="m-actionbar">
                <div className="row">
                    <div className="col-4 m-logo">
                    <Link to={'/'}>
                        <IoIosArrowBack size='2.1rem'  className="a-actionLogo"/>
                    </Link>
                    </div>
                    <div className="col-4 m-logo">
                        <div className="m-stats">
                            <a href="score.php?date=<?php echo $date;?>&id=<?php echo $gameId;?>&team=away" className="a-statSelect">{hTeamTriCode}</a>
                            <a href="score.php?date=<?php echo $date;?>&id=<?php echo $gameId;?>&team=home" className="a-statNone">{vTeamTriCode}</a>
                        </div>
                    </div>
                    <div className="col-4 m-logo">
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ActionBar;