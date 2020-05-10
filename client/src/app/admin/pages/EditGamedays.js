import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';



const EditGamedays = ({children}) => {
    const { findAllGames, hardDeleteGameday } = useApi();
    
    const [gamedays, setGamedays] = useState();
    const [gamedayId,setGamedayId] = useState();

    // FETCH DATA
    useEffect(() => {

        const fetchGame = async () => {
            const data = await findAllGames();
            setGamedays(data);
            console.log(data);
        }
        fetchGame();
    }, [])
    const handleSubmit = (id) => {
        hardDeleteGameday(id);
        window.location.reload(false);

    }
    const isEven = (n) => {
        return n % 2 == 0;
     };
    
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
            gamedays && gamedays.map((data, index) => {

                    return <tr key={data._id} class={isEven(index)?'' : ''}>
                            <td>{data._id}</td>
                            <td>{data.games.length}</td>
                            <td>
                                {/* <a class="button hollow success" href={Routes.BACKOFFICE_EDIT_GAMEDAYS} onClick={e => handleSubmit(data._id)}>DELETE</a> */}
                            
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setGamedayId(data._id)}>DELETE
                            </button>
                            
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
                        <button type="button" class="btn btn-danger" onClick={e => handleSubmit(gamedayId)}>Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditGamedays;