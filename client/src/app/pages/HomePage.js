import {default as React, useState, useEffect, useCallback} from 'react'; 
import {DatePicker, GameList, } from '../components/homepage';
import {Navbar, BottomNav} from '../components/elements';
import { useApi } from '../services';

const HomePage = ({children}) => {

    const { findAllPosts } = useApi();
    const [ posts, setPosts ] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            const data = await findAllPosts();
            console.log(data);
            setPosts(data);

        }
        fetchPost();
    }, [])
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