import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { NBAContext } from '../context';

const ActionBar = ({gameStats}) => {

    const { toggleStats } = useContext(NBAContext);
    const { displayHTeam } = useContext(NBAContext);

    const [vTeamTriCode, setVTeamTriCode ] = useState();
    const [hTeamTriCode, setHTeamTriCode ] = useState();


    
    // Save the Team's TRICODE (short name) from the Game Statistics data in respective states
    
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
                        <IoIosArrowBack size='2em'  className="a-actionLogo"/>
                    </Link>
                    </div>
                    <div className="col-4 m-logo">
                        <div className="m-stats">
                            <a onClick={(e) => toggleStats(true)} className={displayHTeam === true ? "a-statSelect" : "a-statNone"}>{hTeamTriCode}</a>
                            <a onClick={(e) => toggleStats(false)} className={displayHTeam === false ? "a-statSelect" : "a-statNone"}>{vTeamTriCode}</a>
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