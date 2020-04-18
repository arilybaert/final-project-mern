import {default as React} from 'react'; 
import {Navbar, BottomNav, DatePicker, GameList,} from '../components/elements';

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