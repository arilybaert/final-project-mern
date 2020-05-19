import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';



const EditGamedays = ({children}) => {
    const { findGames, findAllGames, hardDeleteGameday, softDeleteGameday, softUnDeleteGameday } = useApi();
    
    const [gamedays, setGamedays] = useState();
    const [gamedayId,setGamedayId] = useState();
    const [gamedayDate, setGamedayDate] = useState();

    // FETCH DATA
    useEffect(() => {

        const fetchGame = async () => {
            const data = await findAllGames();
            setGamedays(data);
        }

        fetchGame();
    }, [gamedayId])


    const setReadableDate = (date) => {
        var year = date.substring(0,4);
        var month = date.substring(4,6);
        var day = date.substring(6,8);
        return `${day}/${month}/${year}`;
    }
    const handleSubmit = async (id) => {
        await hardDeleteGameday(id);
        setGamedayId(id);
        window.location.reload(false);
    }

    const softDelete = async (id) => {
        await softDeleteGameday(id);
        setGamedayId(id);
        window.location.reload(false);
    }

    const softUnDelete = async (id) => {
        await softUnDeleteGameday(id);
        setGamedayId(id);
        window.location.reload(false);
    }

    const createUpdateGamedays = async (id, e) => {
        e.preventDefault();
        const data = await findGames(id);
        console.log(data);
        // window.location.reload(false);
    }
    const handleChange = (e) => {
        setGamedayDate(e.target.value);
        
        // console.log(e.target.value);
    }
// onClick={() => createUpdateGamedays()}

    return (
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
            <div className="medium-12 large-12 columns">

                            <button type='button' className='btn btn-primary'  data-toggle="modal" data-target="#createEdit">
                                CREATE / UPDATE GAMEDAY
                            </button>

            <table className="stack table-striped">
                <thead>
                <tr>
                    <th width="300">Day</th>
                    <th width="300">Games</th>
                    <th width="300">Actie</th>
                </tr>
                </thead>
                <tbody >
        {
            gamedays && gamedays.map((data) => {

                    return <tr key={data._id}>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{setReadableDate(data._id)}</td>
                            <td>{data.games.length}</td>
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setGamedayId(data._id)}>DELETE
                            </button>
                            {data._deletedAt != null? 
                            <button type='button' className='btn btn-warning'  onClick={() => softUnDelete(data._id)}>UNDELETE</button>
                            
                            :<button type='button' className='btn btn-warning'  onClick={() => softDelete(data._id)}>SOFT DELETE</button>}
                            
                            <Link to={`${Routes.BACKOFFICE_EDIT_GAMEDAYS}/${data._id}`} className='btn btn-info'>Edit</Link>



                            </td>

                            </tr>
                        
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
                        {/* <div className="modal-body">
                            ...
                        </div> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" className="btn btn-danger" onClick={e => handleSubmit(gamedayId)}data-dismiss="modal">Yes</button>
                        </div>
                        </div>
                    </div>
                </div>

{/* UPDATE / CREATE delete pop-up */}

                <div className="modal fade" id="createEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create / update gamedays</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label for="date">Gameday date:</label>
                                <input type="text" class="form-control" id="date" name="date" placeholder="YYYYMMDD" onChange={handleChange}></input>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={e => createUpdateGamedays(gamedayDate, e)}data-dismiss="modal">Create/Update</button>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        </div>
    )
}

export default EditGamedays;