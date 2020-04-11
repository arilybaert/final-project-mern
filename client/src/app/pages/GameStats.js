import { default as React, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'

import { useApi } from '../services';
import {Navbar} from '../components/elements';
import {ActionBar, Leaders, StatsTable,TeamScores} from '../components/gamestats'

const GameStats = () => {
    const { findGameStats } = useApi();

    const [gameStats, setGameStats] = useState();
    let { id } = useParams();
    let { date } = useParams();

    // FETCH DATA
    useEffect(( ) => {
        const fetchGameStats = async () => {
            const data = await findGameStats(date, id);
            console.log(data);
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