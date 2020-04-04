import { default as React, useContext, createContext } from 'react';

const ApiContext = createContext();

const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
const BASE_URL = `http://localhost:8080/api`;

// FIND GAMES PER DAY
const findGames = async (date) => {
    let url = `${BASE_URL}/gamedays/${date}`;
    const response = await fetch(url);
    return response.json()
}

// FIND TEAMS
const refreshTeams = async () => {
    let url = `${BASE_URL}/teams`;
    await fetch(url);
    // return response.json()
}

const findTeam = async (id) => {
    let url = `${BASE_URL}/teams/${id}`;
    const response = await fetch(url);
    return response.json();
}
// FIND GAMES statistics
const findGameStats = async (date, id) => {
    let url = `${BASE_URL}/gameStats/${date}/${id}`;
    const response = await fetch(url);
    return response.json()
}
    return (
        <ApiContext.Provider value={{ findGames, refreshTeams, findTeam, findGameStats }}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiContext,
    ApiProvider,
    useApi,
}
