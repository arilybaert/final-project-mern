import { default as React, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'

import { useApi } from '../services';
import {Navbar} from '../components/elements';
import {ActionBar, Leaders, StatsTable,TeamScores} from '../components/gamestats'

const GameStats = () => {
    const { findGameStats } = useApi();

    let { id } = useParams();
    let { date } = useParams();
    
    const [gameStats, setGameStats] = useState();


    // FETCH DATA
    useEffect(( ) => {
        const fetchGameStats = async () => {
            const data = await findGameStats(date, id);
            setGameStats(data);
        }
        fetchGameStats();
    }, [date, id]);


    return (
        <div>
            <Navbar/>
            <TeamScores gameStats={gameStats}/>
            <ActionBar gameStats={gameStats}/>
            <Leaders gameStats={gameStats}/>
            <StatsTable gameStats={gameStats}/>
        </div>

    )
}

export default GameStats;