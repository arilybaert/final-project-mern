import React from 'react';
import {FavoAddBtn, FavoGameList, FavoHeader} from '../components/favorites';
import {Navbar, BottomNav} from '../components/elements';


const FavoritePage = () => {
    return (
        <div>
            <Navbar/>
            <FavoHeader/>
            <FavoGameList/>
            <FavoAddBtn/>
            <BottomNav/>
        </div>
    )
}

export default FavoritePage;