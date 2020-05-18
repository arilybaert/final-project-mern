import React from 'react';
import { useParams } from 'react-router-dom';

import { useApi } from '../../services';
import { Navbar } from '../components'



const ModifyGamedays = () => {
    let { id } = useParams();
    const USER_UPDATE_URL = "http://localhost:8080/api/gamedays/update";


    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const gameDate = data.get('GamedayDate');

      const day = gameDate.substr(0, 2);
      const month = gameDate.substr(3, 2);
      const year = gameDate.substr(6, 4);

      const formData = {
        'Id': data.get('Id'),
        'GamedayDate': `${year}${month}${day}`,
      };
      
      await fetch(USER_UPDATE_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(formData),
          mode: 'cors', 
      });

      
    }

    return (
        <div>
        <Navbar/>
        <form onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="GamedayDate">Gameday date</label>
              <input type="text" class="form-control" id="GamedayDate" name="GamedayDate" placeholder="DD/MM/YYYY" ></input>
              <input type="hidden" class="form-control" id="Id" name="Id" value={id} ></input>
            </div>
            <div class="form-group col-md-6">
              <label for="GamedayDate">Games</label>
              <div type="text" class="form-control bg-light" id="GamedayDate" name="GamedayDate" placeholder="DD/MM/YYYY" >10</div>
            </div>
          </div>

          <button class="btn btn-primary" >Save</button>
        </form>
</div>

)
}


export default ModifyGamedays;