import {default as React, useState, useEffect, useCallback} from 'react'; 
import {DatePicker, GameList, } from '../components/homepage';
import {Navbar, BottomNav} from '../components/elements';
import { useApi } from '../services';

const HomePage = ({children}) => {


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