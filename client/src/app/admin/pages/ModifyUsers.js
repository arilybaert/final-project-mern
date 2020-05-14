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


return (
    <div>

<form method="POST" action={USER_UPDATE_URL}>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="Firstname">Firstname</label>
      <input type="text" class="form-control" id="Firstname" name="Firstname" placeholder="Firstname"></input>
      <input type="hidden" class="form-control" id="Id" name="Id" value={id}></input>
    </div>
    <div class="form-group col-md-6">
      <label for="Lastname">Lastname</label>
      <input type="text" class="form-control" id="Lastname" name="Lastname" placeholder="Lastname"></input>
    </div>
  </div>
  <div class="form-row">

  <div class="form-group col-md-6">
    <label for="Email">Email</label>
    <input type="email" class="form-control" id="Email" name="Email" placeholder="Email"></input>
  </div>
<div class="form-group col-md-4">
    <label for="role">Role</label>
    <select id="role" class="form-control" name="Role">
    <option selected>admin</option>
    <option>user</option>
    </select>
</div>
</div>

  <button type="submit" class="btn btn-primary">Save</button>
</form>
    </div>
)
}


export default ModifyUsers