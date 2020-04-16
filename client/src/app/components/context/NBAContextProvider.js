import React, { createContext, useState } from 'react';

const NBAContext = createContext();

const NBAContextProvider = ({children}) => {

    // Date is send with API to get the correct gameday / game stats
    const [utilDate, setUtilDate] = useState();
    const [displayLeague, setDisplayLeague] = useState('All');


    // Toggle to show stats from HOME or AWAY team
    const [displayHTeam, setDisplayHTeam] = useState(true);

    const toggleStats = (bool) => {
        setDisplayHTeam(bool);
    }

    return (
        <NBAContext.Provider value={{utilDate, setUtilDate, displayHTeam, toggleStats, displayLeague, setDisplayLeague}}>
            {children}
        </NBAContext.Provider>
    )
}

export {
    NBAContext,
    NBAContextProvider,
}