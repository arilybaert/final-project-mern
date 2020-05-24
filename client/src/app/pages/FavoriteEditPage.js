import React, {useEffect, useState, useContext} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import {Navbar, BottomNav} from '../components/elements';
import { useApi } from '../services';
import {FAVORITES} from '../routes'
import { NBAContext } from '../components/context';


const FavoriteEditPage = ({}) => {
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

    /*
    
    I was going to save favorites with userId but I can't get the sign-in / sign-up to work so I ended up saving favorites per localStorage to fake functionality
    
    */

    const handleSubmit = async (checkedTeams) => {
let _id
        if(!localStorage.getItem('_id')){
            _id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

        localStorage.setItem('_id', _id);
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
                            <button onClick={() => handleSubmit(checkedTeams)}className='a-buttonCheckbox'>SAVE</button>
                        </Link>


            </div>

    )
}

export default FavoriteEditPage;