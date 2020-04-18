import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';

import { useApi } from '../../services';
import FavoGameItem from './FavoGameItem';
import {GameItem} from '../elements';
import { NBAContext } from '../context';


const FavoGameList = () => {
    const [ games, setGames ] = useState();
    const [render, setRender] = useState(false);
    
    const { findGames } = useApi();
    const { refreshTeams } = useApi();
    
    const { checkedTeams } = useContext(NBAContext);
    const { utilDate } = useContext(NBAContext);

    // // MAKE DATE READABLE
    // const addZero = (input, n) => {
    //     let inputString = String(input);
    //     while(inputString.length < n) {
    //         inputString = `0${inputString}`;
    //     }
    //     return inputString;
    // };

    // // GET DATE
    // const date = () => {

    //     const date = new Date();
    //     const day = date.getDate();
    //     const month = date.getMonth();
    //     const year = date.getFullYear();

    //     const readable = `${year}${addZero(month+1, 2)}${addZero(day, 2)}`;
    //     return readable;
    // };


    useEffect(() => {
        console.log(checkedTeams);
    }, [checkedTeams]);



    // FETCH DATA
    useEffect(() => {
        const fetchGame = async () => {
            if(checkedTeams.length > 0){
                if(utilDate !== null){
                    setRender(true);
                    const tempGames = []
                    // const data = await findGames(utilDate);
                    const data = await findGames('20200307');
                     // await refreshTeams();
                     checkedTeams.forEach((team) => {
                         data.games.forEach((game) => {
                             if(team === game.hTeam || game.vTeam){
                                tempGames.push(game);
                             }
                         })
                     })
                     console.log(data);
                    setGames(tempGames);
                }
            }
        }

        if(utilDate !== undefined){
            fetchGame();
            
        }
    },[utilDate, checkedTeams]);

if(render === true){
        return (
            <div className="row">
                <div className="col-12">
                    {   
                        games && games.map((data) => {
                            return <Link  key={data._id} to={{pathname:`/games/${data.startDateEastern}/${data._id}`}}><GameItem data={data} key={data._id} /></Link>
                        })
                    }
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-12">
                    <p> No favorite Teams selected ... </p>
                </div>
            </div>
        )
    }

}

export default FavoGameList;