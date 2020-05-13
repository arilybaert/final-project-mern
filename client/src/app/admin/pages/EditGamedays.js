import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';



const EditGamedays = ({children}) => {
    const { findAllGames, hardDeleteGameday, softDeleteGameday, softUnDeleteGameday } = useApi();
    
    const [gamedays, setGamedays] = useState();
    const [gamedayId,setGamedayId] = useState();

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
    }

    const softDelete = async (id) => {
        await softDeleteGameday(id);
        setGamedayId(id);
    }

    const softUnDelete = async (id) => {
        await softUnDeleteGameday(id);
        setGamedayId(id);
    }



    return (
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
            gamedays && gamedays.map((data) => {
                console.log(data._deletedAt);

                    return <tr key={data._id}>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{setReadableDate(data._id)}</td>
                            <td>{data.games.length}</td>
                            <td>
                            
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setGamedayId(data._id)}>DELETE
                            </button>
                            {data._deletedAt != null? 
                            <button type='button' class='btn btn-warning'  onClick={() => softUnDelete(data._id)}>UNDELETE</button>
                            
                            :<button type='button' class='btn btn-warning'  onClick={() => softDelete(data._id)}>SOFT DELETE</button>}
                            
                            
                            </td>

                            </tr>
                        
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
                        <button type="button" class="btn btn-danger" onClick={e => handleSubmit(gamedayId)}data-dismiss="modal">Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditGamedays;