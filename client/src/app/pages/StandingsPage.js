import React from 'react';
import {LeaguePicker, Standings} from '../components/standings';
import {Navbar, BottomNav} from '../components/elements';


const StandingsPage = () => {
    return (
      <div>
        <Navbar/>
        <LeaguePicker/>
        <Standings/>
        <BottomNav/>
    </div>
    )  
  }

  export default StandingsPage;