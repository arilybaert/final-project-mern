import React from 'react'; 
import {DatePicker, GameList, } from '../components/homepage';
import {Navbar, BottomNav} from '../components/elements';

const HomePage = () => {

    return (
        <div>
            <Navbar/>
            <DatePicker/>
            <GameList/>
            <BottomNav/>
        </div>
    )
  }

  export default HomePage;