import React, { useEffect, useState } from 'react';

import { useParams, Redirect } from 'react-router-dom';
import * as Routes from '../../routes';


import { useApi } from '../../services';
import { Navbar } from '../components'



const ModifyTeams = () => {
    let { id } = useParams();
    const { findTeam } = useApi();

    const [team, setTeam] = useState();

    const USER_UPDATE_URL = "http://localhost:8080/api/teams/update";

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

      const formData = {
        'Id': data.get('Id'),
        'City': data.get('City'),
        'Nickname': data.get('Nickname'),
        'triCode': data.get('triCode'),
      };
      
      await fetch(USER_UPDATE_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(formData),
          mode: 'cors', 
      });

      //return <Redirect to={Routes.BACKOFFICE_EDIT_TEAMS}/>
    }

    return (
        <div>
        <Navbar/>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="City">City</label>
              <input type="text" className="form-control" id="City" name="City" placeholder="Los Angeles" ></input>
              <input type="hidden" className="form-control" id="Id" name="Id" value={id} ></input>
              <label for="Nickname">Nickname</label>
              <input type="text" className="form-control" id="Nickname" name="Nickname" placeholder="Lakers" ></input>

            </div>
            <div className="form-group col-md-6">
            <label for="triCode">triCode</label>
              <input type="text" className="form-control" id="triCode" name="triCode" placeholder="LAL" ></input>
            </div>
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
</div>

)
}


export default ModifyTeams;