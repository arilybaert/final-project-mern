import React, {useEffect, useState, useContext} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import {Navbar, BottomNav} from '../components/elements';
import { useApi } from '../services';
import {FAVORITES} from '../routes'
import {DatePicker} from '../components/elements';
import { NBAContext } from '../components/context';


const FavoriteEditPage = ({}) => {

    const { refreshTeams } = useApi();
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

    return (
        <div>
        <Navbar/>
        <div className='row'>
            <div className={classnames('col-12', 'o-checkbox')}>
                {
                NBATeamsCheckBox && NBATeamsCheckBox.map((NBATeam) => (
                    <label key={NBATeam.key}>
                        {NBATeam.label}
                        <input type='checkbox' name={NBATeam.key}   onChange={handleChange}/>
                    </label>
                    ))
                }
                <Link to={FAVORITES}>
                    <button>SAVE</button>
                </Link>
            </div>
        </div>

        </div>
    )
}

export default FavoriteEditPage;