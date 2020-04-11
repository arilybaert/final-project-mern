import React, { createContext, useState } from 'react';

const NBAContext = createContext();

const NBAContextProvider = ({children}) => {
    const [utilDate, setUtilDate] = useState();

    return (
        <NBAContext.Provider value={{utilDate, setUtilDate}}>
            {children}
        </NBAContext.Provider>
    )
}

export {
    NBAContext,
    NBAContextProvider,
}