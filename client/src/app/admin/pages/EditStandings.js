import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';

const EditStandings = () => {
    const { findStandings, hardDeleteStandings, softDeleteStandings, softUnDeleteStandings } = useApi();

    const [standingId, setstandingId] = useState();
    const [standings, setStandings] = useState();

    const [confEastStandings, setConfEastStandings] = useState();
    const [confWestStandings, setConfWestStandings] = useState();

    const [divSEStandings, setDivSEStandings] = useState();
    const [divATLStandings, setDivATLStandings] = useState();
    const [divCENStandings, setDivCENStandings] = useState();
    const [divSWStandings, setDivSWStandings] = useState();
    const [divPACtandings, setDivPACStandings] = useState();
    const [divNWtandings, setDivNWStandings] = useState();


    // FETCH DATA
    useEffect(( ) => {
        const fetchStandings = async () => {
            const data = await findStandings();

            console.log(data);
                setStandings(data[0].allStandings);
                setConfEastStandings(data[0].conferenceStandings.east);
                setConfWestStandings(data[0].conferenceStandings.west);
                setDivSEStandings(data[0].divisionStandings.southeast);
                setDivATLStandings(data[0].divisionStandings.atlantic);
                setDivCENStandings(data[0].divisionStandings.central);
                setDivSWStandings(data[0].divisionStandings.southwest);
                setDivPACStandings(data[0].divisionStandings.pacific);
                setDivNWStandings(data[0].divisionStandings.northwest);
        }
        fetchStandings();
    }, []);


    const handleSubmit = async (id) => {
        await hardDeleteStandings(id);
        setstandingId(id);
    };

    const softDelete = async (id) => {
        await softDeleteStandings(id);
        setstandingId(id);
    }

    const softUnDelete = async (id) => {
        await softUnDeleteStandings(id);
        setstandingId(id);
    }
    return(
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
            <div className="medium-12 large-12 columns">
            <table className="stack table-striped">
                <thead>
                <tr>
                    <th width="200">Standings</th>
                    <th width="200">Teams</th>
                    <th width="200">Actie</th>
                </tr>
                </thead>
                <tbody >

                        {/* STANDINGS */}
                        <tr >
                            <td>All Standings</td>
                            <td>{standings && standings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>
                        {/* CONFERENCE EAST STANDINGS */}
                        <tr >
                            <td>Conference East Standings</td>
                            <td>{confEastStandings && confEastStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>
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
                        <button type="button" className="btn btn-danger" onClick={e => handleSubmit(standingId) }data-dismiss="modal" >Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditStandings;