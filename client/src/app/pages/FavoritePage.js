import React from 'react';
import {FavoAddBtn, FavoGameList, FavoHeader} from '../components/favorites';
import {DatePicker, Navbar, BottomNav} from '../components/elements';


const FavoritePage = () => {
    return (
        <div>
            <Navbar/>
            <DatePicker/>
            <FavoAddBtn/>
            <FavoGameList/>
            <BottomNav/>
        </div>
    )
}

export default FavoritePage;