import React from 'react';
import { useParams } from 'react-router-dom';

import { Navbar } from '../components'

const CreateUser = () => {

    const USER_CREATE_URL = "http://localhost:8080/api/users/create";



    // const handleSubmit = async (id) => {
    //     // await hardDeleteTeam(id);
    //     // setTeamId(id);
    //     window.location.reload(false);
    // };
    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = new FormData(e.target);
        const formData = {
            // 'Id': data.get('Id'),
            'email': data.get('Email'),
            'firstname': data.get('Firstname'),
            'lastname': data.get('Lastname'),
            'role': data.get('Role'),
            'password': data.get('Password'),
          };

          console.log(formData);
        await fetch(USER_CREATE_URL, {
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
                    <div className="form-group col-lg-6">
                        <label htmlFor="Firstname">Firstname</label>
                        <input type="text" className="form-control" id="Firstname" name="Firstname" placeholder="John" ></input>
                        {/* <input type="hidden" className="form-control" id="Id" name="Id" value={id} ></input> */}
                        <label htmlFor="Nickname">Lastname</label>
                        <input type="text" className="form-control" id="Lastname" name="Lastname" placeholder="Doe" ></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="triCode">Email</label>
                        <input type="email" className="form-control" id="Email" name="Email" placeholder="john.doe@telenet.be" ></input>
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password" placeholder="" ></input>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="role">Role</label>
                        <select id="role" className="form-control" name="Role" >
                        <option defaultValue>administrator</option>
                        <option>user</option>
                        </select>
                    </div>
                </div>

                <button className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}


export default CreateUser;