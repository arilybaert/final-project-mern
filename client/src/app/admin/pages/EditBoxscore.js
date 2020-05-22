import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../services';
import { Navbar } from '../components'
import * as Routes from '../../routes';



const EditBoxscore = () => {

    const { findGameStats, findAllGameStats, hardDeleteBoxscore, softDeleteBoxscore, softUnDeleteBoxscore } = useApi();

    const [ boxscores, setBoxscores ] = useState();
    const [ boxscoreId, setBoxscoreId ] = useState();
    const [gamedayDate, setGamedayDate] = useState();
    const [gameId, setGameId] = useState();


    useEffect (() => {
        const fetchBoxscore = async () => {
            const data = await findAllGameStats();
            setBoxscores(data);
        }

        fetchBoxscore();
    },[])

    const handleSubmit = async (id) => {
        console.log(id);
        await hardDeleteBoxscore(id);
        setBoxscoreId(id);
        window.location.reload(false);

    };

    const softDelete = async (id) => {
        await softDeleteBoxscore(id);
        setBoxscoreId(id);
        window.location.reload(false);

    }

    const softUnDelete = async (id) => {
        await softUnDeleteBoxscore(id);
        setBoxscoreId(id);
        window.location.reload(false);

    }

    const handleDateChange = (e) => {
        setGamedayDate(e.target.value);
        window.location.reload(false);

    }

    const handleIdChange = (e) => {
        setGameId(e.target.value);
    }
    const createUpdateBoxscore = async (id, e) => {
        e.preventDefault();
        const data = await findGameStats(gamedayDate, gameId);
        window.location.reload(false);
    }
    return (

                <div>
                <Navbar/>
                <div className="container">
                <div className="row">
                <div className="medium-12 large-12 columns">

                <button type='button' className='btn btn-primary'  data-toggle="modal" data-target="#createUpdate">
                                CREATE / UPDATE BOXSCORE
                </button>

                <table className="stack table-striped">
                    <thead>
                    <tr>
                        <th width="300">Home Team</th>
                        <th width="300">Is Game TBD</th>
                        <th width="300">Away Team</th>
                        <th width="300">Actie</th>
                    </tr>
                    </thead>
                    <tbody >
            {
                    boxscores && boxscores.map((data) => {
                            return(
                            <tr key={data._id}>
                                <td className={data._deletedAt != null? "text-muted" : ""}>{data.hTeam.triCode}</td>
                                <td>{data.isStartTimeTBD.toString()}</td>
                                <td>{data.vTeam.triCode}</td>
                                {/* <td className={data._deletedAt != null? "text-muted" : ""}>{data.fullName}</td>
                                <td>{}</td>*/}
                                <td>
                                
                                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setBoxscoreId(data._id)}>DELETE
                                </button>
                                {data._deletedAt != null? 
                                <button type='button' className='btn btn-warning'  onClick={() => softUnDelete(data._id)}>UNDELETE</button>
                                
                                :<button type='button' className='btn btn-warning'  onClick={() => softDelete(data._id)}>SOFT DELETE</button>}
                                

                                
                                <Link to={`${Routes.BACKOFFICE_EDIT_BOXSCORE}/${data._id}`} className='btn btn-info'>Edit</Link>
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
                            <button type="button" className="btn btn-danger" onClick={e => handleSubmit(boxscoreId) } data-dismiss="modal" >Yes</button>
                        </div>
                        </div>
                    </div>
                    </div>

{/* UPDATE / CREATE delete pop-up */}

<div className="modal fade" id="createUpdate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create / update gamedays</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="date">Gameday date:</label>
                                <input type="text" className="form-control" id="date" name="date" placeholder="YYYYMMDD" onChange={handleDateChange}></input>
                                <label htmlFor="id">Game ID:</label>
                                <input type="text" className="form-control" id="id" name="id" placeholder="1234567" onChange={handleIdChange}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={e => createUpdateBoxscore(gamedayDate, e)}data-dismiss="modal">Create/Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default EditBoxscore;