import { default as React, useContext, createContext } from 'react';

const ApiContext = createContext();

const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
const BASE_URL = `http://localhost:8080/api`;

// FIND ALL GAMES
const findAllGames = async () => {
    let url = `${BASE_URL}/gamedays`;
    const response = await fetch(url);
    return response.json();
}
// FIND GAMES PER DAY
const findGames = async (date) => {
    let url = `${BASE_URL}/gamedays/${date}`;
    const response = await fetch(url);
    return response.json();
}

// FIND TEAMS
const refreshTeams = async () => {
    let url = `${BASE_URL}/teams`;
    const response = await fetch(url);
    return response.json();
}

const findTeam = async (id) => {
    let url = `${BASE_URL}/teams/${id}`;
    const response = await fetch(url);
    return response.json();
}
// FIND GAMES statistics
const findGameStats = async (date, id, signal) => {
    let url = `${BASE_URL}/gameStats/sort/${date}/${id}`;
    const response = await fetch(url, {signal: signal});
    return response.json()
}
// FIND GAMES statistics
const findStandings = async () => {
    let url = `${BASE_URL}/standings/all`;
    const response = await fetch(url);
    return response.json()
}

/*
EDIT
*/
// GAMEDAY
const hardDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/delete/${id}`;
    await fetch(url);
    console.log('hard deleted');
}

const softDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/softdelete/${id}`;
    await fetch(url);
}

const softUnDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/softundelete/${id}`;
    await fetch(url);
}

// TEAMS
const hardDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/delete/${id}`;
    await fetch(url);
    console.log('hard deleted');
}

const softDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/softdelete/${id}`;
    await fetch(url);
}

const softUnDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/softundelete/${id}`;
    await fetch(url);
}

    return (
        <ApiContext.Provider value={{ findAllGames, findGames, refreshTeams, findTeam, findGameStats, findStandings, hardDeleteGameday, softDeleteGameday, softUnDeleteGameday, hardDeleteTeam, softDeleteTeam, softUnDeleteTeam}}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiContext,
    ApiProvider,
    useApi,
}
