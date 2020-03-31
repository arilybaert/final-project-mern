import GameItem from './GameItem';
import { useApi } from '../../services';
import { default as React, useState, useEffect, useCallback } from 'react';

const GameList = () => {

    const { findAllPosts } = useApi();
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
        const fetchPost = async () => {
            const data = await findAllPosts(date());
            setGames(data.games);
        }
        fetchPost();
    }, [])
    return (
        <div className="row">
            <div className="col-12">
                {
                    games && games.map((data) => {
                        return <GameItem data={data} key={data._id}/>
                    })
                }
                
            </div>
        </div>
    )
}

export default GameList;