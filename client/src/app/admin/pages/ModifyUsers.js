import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navbar } from '../components'
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
              },
            body: JSON.stringify(formData),
            mode: 'cors', 
        });
    }

return (
    <div>
            <Navbar/>
<form onSubmit={handleSubmit}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="Firstname">Firstname</label>
      <input type="text" className="form-control" id="Firstname" name="Firstname" placeholder="Firstname" ></input>
      <input type="hidden" className="form-control" id="Id" name="Id" value={id} ></input>
    </div>
    <div className="form-group col-md-6">
      <label for="Lastname">Lastname</label>
      <input type="text" className="form-control" id="Lastname" name="Lastname" placeholder="Lastname" ></input>
    </div>
  </div>
  <div className="form-row">

  <div className="form-group col-md-6">
    <label for="Email">Email</label>
    <input type="email" className="form-control" id="Email" name="Email" placeholder="Email" ></input>
  </div>
<div className="form-group col-md-4">
    <label for="role">Role</label>
    <select id="role" className="form-control" name="Role" >
      <option selected>admin</option>
      <option>user</option>
    </select>
</div>
</div>

  <button className="btn btn-primary" >Save</button>
</form>
    </div>
)
}


export default ModifyUsers