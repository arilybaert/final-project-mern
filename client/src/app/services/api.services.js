import { default as React, useContext, createContext } from 'react';

const ApiContext = createContext();

const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
const BASE_URL = `http://localhost:8080/api`;


// USERS
const findUser = async (id) => {
    let url = `${BASE_URL}/users/${id}`;
    const response = await fetch(url);
    return response.json();
};

const findAllUsers = async () => {
    let url = `${BASE_URL}/users`;
    const response = await fetch(url);
    return response.json();
};

const hardDeleteUser = async (id) => {
    let url = `${BASE_URL}/users/delete/${id}`;
    await fetch(url);
    console.log('hard deleted');
}

const softDeleteUser = async (id) => {
    let url = `${BASE_URL}/users/softdelete/${id}`;
    await fetch(url);
};

const softUnDeleteUser = async (id) => {
    let url = `${BASE_URL}/users/softundelete/${id}`;
    await fetch(url);
};


// GAMEDAY
const findAllGames = async () => {
    let url = `${BASE_URL}/gamedays`;
    const response = await fetch(url);
    return response.json();
};

const findGames = async (date) => {
    let url = `${BASE_URL}/gamedays/${date}`;
    const response = await fetch(url);
    return response.json();
};

const hardDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/delete/${id}`;
    await fetch(url);
    console.log('hard deleted');
};

const softDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/softdelete/${id}`;
    await fetch(url);
}

const softUnDeleteGameday = async (id) => {
    let url = `${BASE_URL}/gamedays/softundelete/${id}`;
    await fetch(url);
};


// TEAMS
const refreshTeams = async () => {
    let url = `${BASE_URL}/teams`;
    const response = await fetch(url);
    return response.json();
}

const allTeams = async () => {
    let url = `${BASE_URL}/teams/all`;
    const response = await fetch(url);
    return response.json();
};

const findTeam = async (id) => {
    let url = `${BASE_URL}/teams/${id}`;
    const response = await fetch(url);
    return response.json();
};

const hardDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/delete/${id}`;
    await fetch(url);
    console.log('hard deleted');
};

const softDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/softdelete/${id}`;
    await fetch(url);
};

const softUnDeleteTeam = async (id) => {
    let url = `${BASE_URL}/teams/softundelete/${id}`;
    await fetch(url);
};


// BOXSCORE / GAMESTATS
const findGameStats = async (date, id, signal) => {
    let url = `${BASE_URL}/gameStats/sort/${date}/${id}`;
    const response = await fetch(url, {signal: signal});
    return response.json()
};

const findAllGameStats = async () => {
    let url = `${BASE_URL}/gameStats`;
    const response = await fetch(url);
    return response.json();
};
const hardDeleteBoxscore = async (id) => {
    let url = `${BASE_URL}/gameStats/delete/${id}`;
    console.log(url);
    await fetch(url);
}

const softDeleteBoxscore = async (id) => {
    let url = `${BASE_URL}/gameStats/softdelete/${id}`;
    await fetch(url);
};

const softUnDeleteBoxscore = async (id) => {
    let url = `${BASE_URL}/gameStats/softundelete/${id}`;
    await fetch(url);
};


// STANDINGS
const findStandings = async () => {
    let url = `${BASE_URL}/standings/all`;
    const response = await fetch(url);
    return response.json()
};

const hardDeleteStandings = async (id) => {
    let url = `${BASE_URL}/standings/delete/${id}`;
    await fetch(url);
    console.log('hard deleted' + id);
}

const softDeleteStandings = async (id) => {
    let url = `${BASE_URL}/standings/softdelete/${id}`;
    await fetch(url);
};

const softUnDeleteStandings = async (id) => {
    let url = `${BASE_URL}/standings/softundelete/${id}`;
    await fetch(url);
};

// FAVORITES
const findFavorites = async (id) => {
    let url = `${BASE_URL}/favorites/${id}`;
    const response = await fetch(url);
    return response.json()

};



// POST
const createFavorites = async(_id, checkedTeams) => {
    let url = `${BASE_URL}/favorites/create`;
    const data = {
        '_id' : _id,
        'teams': checkedTeams
    };
    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
        mode: 'cors', 
    })
}

// MODIFY USER
const modifyUser = async (formData) => {
    let url = `${BASE_URL}/users/update`;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(formData),
        mode: 'cors', 
    });
}

    return (
        <ApiContext.Provider value={{ 
            findUser, findAllUsers, hardDeleteUser, softDeleteUser, softUnDeleteUser, modifyUser,

            findAllGames, findGames,  hardDeleteGameday, softDeleteGameday, softUnDeleteGameday, 

            refreshTeams, allTeams, findTeam, hardDeleteTeam, softDeleteTeam, softUnDeleteTeam,

            findGameStats, findAllGameStats, hardDeleteBoxscore, softDeleteBoxscore, softUnDeleteBoxscore, 

            findStandings, hardDeleteStandings, softDeleteStandings, softUnDeleteStandings, 

            createFavorites, findFavorites

            }}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiContext,
    ApiProvider,
    useApi,
}
