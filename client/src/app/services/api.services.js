import { default as React, useEffect, useState, useContext, createContext } from 'react';

const ApiContext = createContext();

const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
const BASE_URL = `http://localhost:8080/api`;

const findAllPosts = async (date) => {
    let url = `${BASE_URL}/gamedays/${date}`;
    const response = await fetch(url);
    return response.json()
}
    return (
        <ApiContext.Provider value={{ findAllPosts }}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiContext,
    ApiProvider,
    useApi,
}
