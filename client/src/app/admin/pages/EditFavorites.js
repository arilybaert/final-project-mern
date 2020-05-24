import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Navbar } from '../components'
import { useApi } from '../../services';
import * as Routes from '../../routes';

const EditFavorites = () => {
    const { findAllFavorites, hardDeleteFavorites, softDeleteFavorites, softUnDeleteFavorites } = useApi();

    const [favorites, setFavorites] = useState();
    const [favoritesId, setFavoritesId] = useState();

    useEffect(() => {
        const fetchFavorites = async () => {
            const data = await findAllFavorites();
            console.log(data);
            setFavorites(data);
        }

        fetchFavorites();
    },[]);


    const handleSubmit = async (id) => {
        await hardDeleteFavorites(id);
        setFavoritesId(id);
        window.location.reload(false);

    };

    const softDelete = async (id) => {
        await softDeleteFavorites(id);
        setFavoritesId(id);
        window.location.reload(false);

    }

    const softUnDelete = async (id) => {
        await softUnDeleteFavorites(id);
        setFavoritesId(id);
        window.location.reload(false);

    }

    return(
        <div>
            <Navbar/>
            <div className="container">
            <div className="row">
            <div className="medium-12 large-12 columns">

            <Link to={`${Routes.BACKOFFICE_CREATE_USERS}`}>
            <button type='button' className='btn btn-primary'  data-toggle="modal" data-target="#createUpdate">
                                CREATE USER
            </button>
            </Link>

            <table className="stack table-striped">
                <thead>
                <tr>
                    <th width="300">UserID</th>
                    <th width="300">Favorites</th>
                </tr>
                </thead>
                <tbody >
        {
            favorites && favorites.map((data) => {
                        return(
                        <tr key={data._id}>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{data.profile.firstName}</td>
                            <td className={data._deletedAt != null? "text-muted" : ""}>{data.profile.lastName}</td>

                            {/* <td className={data._deletedAt != null? "text-muted" : ""}>{data.fullName}</td>
                            <td>{}</td>*/}
                            <td>
                            
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => setFavoritesId(data._id)}>DELETE
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
                        <button type="button" className="btn btn-danger" onClick={e => handleSubmit(favoritesId) } data-dismiss="modal" >Yes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        </div>
    )
}

export default EditFavorites;