import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';

const EditTeams = () => {
    const { refreshTeams, hardDeleteTeam, softDeleteTeam, softUnDeleteTeam } = useApi();

    const [teams, setTeams] = useState();
    const [teamId, setTeamId] = useState();

    useEffect(() => {
        const fetchTeams = async () => {
            const data = await refreshTeams();
            console.log(data);
            setTeams(data);
        }

        fetchTeams();
    },[])

    const handleSubmit = async (id) => {
        await hardDeleteTeam(id);
        setTeamId(id);
    }

    const softDelete = async (id) => {
        await softDeleteTeam(id);
        setTeamId(id);
    }

    const softUnDelete = async (id) => {
        await softUnDeleteTeam(id);
        setTeamId(id);
    }
    return(
        <div>
            <Navbar/>
            <div class="container">
            <div class="row">
            <div class="medium-12 large-12 columns">
            <table class="stack table-striped">
                <thead>
                <tr>
                    <th width="200">Day</th>
                    <th width="200">Games</th>
                    <th width="200">Actie</th>
                </tr>
                </thead>
                <tbody >
        {
            teams && teams.map((data) => {
                console.log(data);

                    return data.isNBAFranchise ?
                    
                        <tr key={data._id}>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{data.fullName}</td>
                            <td>{}</td>
                            <td>
                            
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setTeamId(data._id)}>DELETE
                            </button>
                            {data._deletedAt != null? 
                            <button type='button' class='btn btn-warning'  onClick={() => softUnDelete(data._id)}>UNDELETE</button>
                            
                            :<button type='button' class='btn btn-warning'  onClick={() => softDelete(data._id)}>SOFT DELETE</button>}
                            
                            
                            </td>

                        </tr>

                        :
                        ''
                        
            })
        }
                        </tbody>

                    </table>
                    </div>
                    </div>

{/* Prefent faulty delete pop-up */}

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Are you sure? </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* <div class="modal-body">
                        ...
                    </div> */}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" onClick={e => handleSubmit(teamId)}>Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditTeams;