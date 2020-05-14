import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useApi } from '../../services';


const ModifyUsers = () => {

    const { findUser } = useApi();
    const { id } = useParams();

    const [user, setUser] = useState();
    const USER_UPDATE_URL = "http://localhost:8080/api/users/update";
    useEffect(() => {
        const fetchUser = async () => {
            const data = await findUser(id);
            console.log(data);
            setUser(data);
        }

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = new FormData(e.target);
        const formData = {
            'Id': data.get('Id'),
            'Email': data.get('Email'),
            'Firstname': data.get('Firstname'),
            'Lastname': data.get('Lastname'),
            'Role': data.get('Role'),
          };

        await fetch(USER_UPDATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(formData),
            mode: 'cors', // no-cors, *cors, same-origin
        });
    }

return (
    <div>

<form onSubmit={handleSubmit}>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="Firstname">Firstname</label>
      <input type="text" class="form-control" id="Firstname" name="Firstname" placeholder="Firstname" ></input>
      <input type="hidden" class="form-control" id="Id" name="Id" value={id} ></input>
    </div>
    <div class="form-group col-md-6">
      <label for="Lastname">Lastname</label>
      <input type="text" class="form-control" id="Lastname" name="Lastname" placeholder="Lastname" ></input>
    </div>
  </div>
  <div class="form-row">

  <div class="form-group col-md-6">
    <label for="Email">Email</label>
    <input type="email" class="form-control" id="Email" name="Email" placeholder="Email" ></input>
  </div>
<div class="form-group col-md-4">
    <label for="role">Role</label>
    <select id="role" class="form-control" name="Role" >
    <option selected>admin</option>
    <option>user</option>
    </select>
</div>
</div>

  <button class="btn btn-primary" >Save</button>
</form>
    </div>
)
}


export default ModifyUsers