import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';

const EditStandings = () => {
    const { findStandings, hardDeleteStandings, softDeleteStandings, softUnDeleteStandings } = useApi();

    // ALL
    const [standingId, setstandingId] = useState();
    const [standings, setStandings] = useState();

    // CONFERENCE
    const [confEastStandings, setConfEastStandings] = useState();
    const [confWestStandings, setConfWestStandings] = useState();

    // DIVISION
    const [divSEStandings, setDivSEStandings] = useState();
    const [divATLStandings, setDivATLStandings] = useState();
    const [divCENStandings, setDivCENStandings] = useState();
    const [divSWStandings, setDivSWStandings] = useState();
    const [divPACStandings, setDivPACStandings] = useState();
    const [divNWStandings, setDivNWStandings] = useState();


    // FETCH DATA
    useEffect(( ) => {
        const fetchStandings = async () => {
            const data = await findStandings();

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

/*
PROBLEM WITH SERVER API: StandingsController.ts
*/

    const handleSubmit = async (id) => {
        // await hardDeleteStandings(id);
        // setstandingId(id);
    };

    const softDelete = async (id) => {
        // await softDeleteStandings(id);
        // setstandingId(id);
    }

    const softUnDelete = async (id) => {
        // await softUnDeleteStandings(id);
        // setstandingId(id);
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
                    <th width="300">Standings</th>
                    <th width="300">Teams</th>
                    <th width="300">Actie</th>
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

                        {/* CONFERENCE WEST STANDINGS */}
                        <tr >
                            <td>Conference West Standings</td>
                            <td>{confWestStandings && confWestStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>
                        </tr>

                        {/* Division WEST STANDINGS */}
                        <tr >
                            <td>Division West Standings</td>
                            <td>{divSEStandings && divSEStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>
                        </tr>

                        {/* Division ATLANTIC STANDINGS */}
                        <tr >
                            <td>Division Atlantic Standings</td>
                            <td>{divATLStandings && divATLStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>

                        {/* Division CENTRAL STANDINGS */}
                        <tr >
                            <td>Division Central Standings</td>
                            <td>{divCENStandings && divCENStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>

                        {/* Division SOUTH WEST STANDINGS */}
                        <tr >
                            <td>Division South West Standings</td>
                            <td>{divSWStandings && divSWStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>

                        {/* Division PACIFIC STANDINGS */}
                        <tr >
                            <td>Division Pacific Standings</td>
                            <td>{divPACStandings && divPACStandings.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setstandingId()}>DELETE
                            </button>
                            {/* {data._deletedAt != null?  */}
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete('standings')}>UNDELETE</button>
                            
                            {/* : */}
                            <button type='button' className='btn btn-warning'  onClick={() => softDelete('standings')}>SOFT DELETE</button>
                            
                            </td>

                        </tr>

                        {/* Division NORTH STANDINGS */}
                        <tr >
                            <td>Division North West Standings</td>
                            <td>{divNWStandings && divNWStandings.length}</td>
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