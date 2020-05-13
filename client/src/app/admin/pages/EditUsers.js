import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';

const EditUsers = () => {
    const { findAllUsers, hardDeleteUser, softDeleteUser, softUnDeleteUser } = useApi();

    const [users, setUsers] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await findAllUsers();
            setUsers(data);
        }

        fetchUsers();
    },[userId]);


    const handleSubmit = async (id) => {
        await hardDeleteUser(id);
        setUserId(id);
    };

    const softDelete = async (id) => {
        await softDeleteUser(id);
        setUserId(id);
    }

    const softUnDelete = async (id) => {
        await softUnDeleteUser(id);
        setUserId(id);
    }
    // 
    return(
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
            <div className="medium-12 large-12 columns">
            <table className="stack table-striped">
                <thead>
                <tr>
                    <th width="300">Firstname</th>
                    <th width="300">Lastname</th>
                    <th width="300">Email</th>
                    <th width="300">Role</th>
                    <th width="300">Actie</th>
                </tr>
                </thead>
                <tbody >
        {
            users && users.map((data) => {
                        return(
                        <tr key={data._id}>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{data.profile.firstName}</td>
                            <td>{data.profile.lastName}</td>
                            <td>{data.email}</td>
                            <td>{data.role}</td>
                            {/* <td className={data._deletedAt != null? "text-muted" : ""}>{data.fullName}</td>
                            <td>{}</td>*/}
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setUserId(data._id)}>DELETE
                            </button>
                            {data._deletedAt != null? 
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete(data._id)}>UNDELETE</button>
                            
                            :<button type='button' className='btn btn-warning'  onClick={() => softDelete(data._id)}>SOFT DELETE</button>}
                            
                            
                            </td> 

                        </tr>
                        )
            })
        }
                        </tbody>

                    </table>
                    </div>
                    </div>

{/* Prefent faulty delete pop-up */}

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Are you sure? </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* <div class="modal-body">
                        ...
                    </div> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" className="btn btn-danger" onClick={e => handleSubmit(userId) } data-dismiss="modal" >Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditUsers;