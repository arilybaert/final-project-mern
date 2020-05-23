import React, {useEffect, useState, useContext} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import { useId } from "react-id-generator";

import {Navbar, BottomNav} from '../components/elements';
import { useApi } from '../services';
import {FAVORITES} from '../routes'
import {DatePicker} from '../components/elements';
import { NBAContext } from '../components/context';


const FavoriteEditPage = ({}) => {
    const [_id] = useId();

    const { refreshTeams, createFavorites } = useApi();
    const { checkedTeams } = useContext(NBAContext);
    const { setCheckedTeams } = useContext(NBAContext);

    const [NBATeamsCheckBox, setNBATeamsCheckbox] = useState();

    // FETCH DATA
    useEffect(() => {

        // FETCH TEAMS FROM API AND PROVIDE CHECKBOX DATA
        const fetchTeams = async () => {
            // FETCH API
            const teams = await refreshTeams();

            // TEMPORARY ARRAY
            const tempNBACheckbox = [];

            // LOOP THROUGH TEAMS
            teams.forEach(function (team) {

                // FILTER NBA TEAMS
                if(team.isNBAFranchise === true){

                    // CHECKBOX DATA
                    const SingleNBACheckbox = {
                        name: team.nickname,
                        key: team.teamId,
                        label: team.nickname,
                    }
                    tempNBACheckbox.push(SingleNBACheckbox);
                }
            });
            setNBATeamsCheckbox(tempNBACheckbox);
        }
        fetchTeams();
    }, [])

    // ONCHANGE HANDLER CHECKBOX
    const handleChange = (e) => {
        const key = e.target.name;
        const tempChecked = checkedTeams;
        if (tempChecked.includes(key)){
            setCheckedTeams(tempChecked.filter(e => e !== key));
        } else {
            tempChecked.push(key);
            setCheckedTeams(tempChecked);
        }
        console.log(checkedTeams);
        // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
 
    }
    
    const handleSubmit = async (_id, checkedTeams) => {
        await createFavorites(_id, checkedTeams);
    }

    return (
        <div className='o-checkbox'>
        <Navbar/>

                {
                NBATeamsCheckBox && NBATeamsCheckBox.map((NBATeam) => {
                    // RETURN CHECKED OR UNCHECKED CHECKBOX
                    if(checkedTeams.includes(NBATeam.key)){
                        return(
                            <div className="row">
                                <div className={classnames('col-12', 'o-teamsCheckbox')}>
                                    <label key={NBATeam.key}>
                                        {NBATeam.label}
                                        <input type='checkbox' checked name={NBATeam.key}   onChange={handleChange}/>
                                    </label>
                                </div>
                            </div>
                            )
                    } else {
                        return(
                            <div className={classnames('row', 'o-teamsCheckbox')} key={NBATeam.key}>
                                <div className={classnames('col-12')}>
                                    <div className='row'>
                                        <div className='col'>
                                            <image alt='image' title='image'></image>
                                        </div>
                                        <div className={classnames('col', 'a-teamnameCheckbox')}>
                                            <span>
                                                {NBATeam.label}
                                            </span>
                                        </div>
                                        <div className={classnames('col', 'm-inputCheckbox')}>
                                            <input type='checkbox'  name={NBATeam.key}   onChange={handleChange} className='a-inputCheckbox'/>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                    )
                    }
                })
                }

                        <Link to={FAVORITES}>
                            <button onClick={() => handleSubmit(_id, checkedTeams)}className='a-buttonCheckbox'>SAVE</button>
                        </Link>


            </div>

    )
}

export default FavoriteEditPage;