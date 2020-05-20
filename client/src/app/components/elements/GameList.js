import { default as React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import {NBAContext} from '../context';
import GameItem from './GameItem';
import { useApi } from '../../services';


const GameList = () => {

    const { findGames } = useApi();
    // const { refreshTeams } = useApi();
    const [ games, setGames ] = useState(false);

    const { utilDate } = useContext(NBAContext);


    // MAKE DATE READABLE
    const addZero = (input, n) => {
        let inputString = String(input);
        while(inputString.length < n) {
            inputString = `0${inputString}`;
        }
        return inputString;
    };

    // GET DATE
    const date = () => {

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const readable = `${year}${addZero(month+1, 2)}${addZero(day, 2)}`;
        return readable;
    };

    // FETCH DATA
    useEffect(() => {
        const fetchGame = async () => {
            if(utilDate !== null){
                const data = await findGames(utilDate);
                // const data = await findGames('20200307');
                // await refreshTeams();
                setGames(data.games);
            }
        }

        if(utilDate !== undefined){
            fetchGame();
            
        }
    },[utilDate]);



        return (
            <div className="row">
            <div className="col-12">
                {
                    games==false || games==undefined ?
                    
                    <div className="a-noGameList"><span>No games today</span></div>
                    :

                    games && games.map((data) => {
                        return <Link  key={data._id} to={{pathname:`/games/${data.startDateEastern}/${data._id}`}}><GameItem data={data} key={data._id} /></Link>
                    })
                }
                
            </div>
        </div>
        )


}

export default GameList;