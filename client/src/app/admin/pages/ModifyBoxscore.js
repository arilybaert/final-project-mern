import React, { useEffect, useState } from 'react';

import { useParams, Redirect } from 'react-router-dom';
import * as Routes from '../../routes';


import { useApi } from '../../services';
import { Navbar } from '../components'



const ModifyBoxscore = () => {
    let { id } = useParams();
    const { findTeam } = useApi();

    const [team, setTeam] = useState();

    const USER_UPDATE_URL = "http://localhost:8080/api/gameStats/update";

    console.log(id);
    /*
    Tried to display team values as pmaceholders but kept getting team is undefined error when using team data in input placeholder field
    */
    useEffect(() => {
        const fetchTeam = async (id) => {
            const data = await findTeam(id);
            // console.log(data);
            setTeam(data);
        }
        fetchTeam(id)
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);

      var isTrueSet = (data.get('isTBD') == 'true');
      const formData = {
        'Id': data.get('Id'),
        'homeTeam': data.get('homeTeam'),
        'awayTeam': data.get('awayTeam'),
        'triCodisTBDe': isTrueSet,
      };

      console.log(formData);
      
    //   await fetch(USER_UPDATE_URL, {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json'
    //         },
    //       body: JSON.stringify(formData),
    //       mode: 'cors', 
    //   });

      //return <Redirect to={Routes.BACKOFFICE_EDIT_TEAMS}/>
    }

    return (
        <div>
        <Navbar/>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="homeTeam">Home Team</label>
              <input type="text" className="form-control" id="homeTeam" name="homeTeam" placeholder="LAL" ></input>
              <input type="hidden" className="form-control" id="Id" name="Id" value={id} ></input>
              <label for="awayTeam">Away Team</label>
              <input type="text" className="form-control" id="awayTeam" name="awayTeam" placeholder="CLE" ></input>

            </div>
            <div className="form-group col-md-6">
            <label for="isTBD">Is game to be determined</label>
              {/* <input type="text" className="form-control" id="isTBD" name="isTBD" placeholder="LAL" ></input> */}
                <select id="isTBD" name="isTBD"  class="form-control">
                    <option ngValue="true">true</option>
                    <option ngValue="false">false</option>

                </select>
            </div>
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
</div>

)
}


export default ModifyBoxscore;