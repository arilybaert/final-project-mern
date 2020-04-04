import GameItem from './GameItem';
import { useApi } from '../../services';
import { Link } from 'react-router-dom';

import { default as React, useState, useEffect } from 'react';

const GameList = () => {

    const { findGames } = useApi();
    const { refreshTeams } = useApi();
    const [ games, setGames ] = useState();

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
            const data = await findGames(date());
            await refreshTeams();
            setGames(data.games);
        }
        fetchGame();
    }, []);


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
}

export default GameList;