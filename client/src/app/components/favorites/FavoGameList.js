/*
 Author getUnique: Sai gowtham
 https://reactgo.com/removeduplicateobjects/
*/

import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import { useApi } from '../../services';
import FavoGameItem from './FavoGameItem';
import {GameItem} from '../elements';
import { NBAContext } from '../context';


const FavoGameList = () => {
    const [ games, setGames ] = useState();
    const [render, setRender] = useState(false);
    
    const { findGames } = useApi();
    const { refreshTeams } = useApi();
    
    const { checkedTeams } = useContext(NBAContext);
    const { utilDate } = useContext(NBAContext);

    // // MAKE DATE READABLE
    // const addZero = (input, n) => {
    //     let inputString = String(input);
    //     while(inputString.length < n) {
    //         inputString = `0${inputString}`;
    //     }
    //     return inputString;
    // };

    // // GET DATE
    // const date = () => {

    //     const date = new Date();
    //     const day = date.getDate();
    //     const month = date.getMonth();
    //     const year = date.getFullYear();

    //     const readable = `${year}${addZero(month+1, 2)}${addZero(day, 2)}`;
    //     return readable;
    // };

    function getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])
      
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
      }
      
      // console.log(getUnique(arr,'id'));
    useEffect(() => {
        console.log(checkedTeams);
    }, [checkedTeams]);



    // FETCH DATA
    useEffect(() => {
        const fetchGame = async () => {
            if(checkedTeams.length > 0){
                if(utilDate !== null){
                    setRender(true);
                    const tempGames = []
                    const data = await findGames(utilDate);
                    console.log(data);
                    if(data != false) {
                        const data = await findGames(utilDate);
                        await refreshTeams();
   
                        checkedTeams.forEach((team) => {
                            data.games.forEach((game) => {
                                if(team === game.hTeam){
                                   tempGames.push(game);
                               } else if (team === game.vTeam) {
                                   tempGames.push(game);
   
                                }
                            })
                        })
                    }


                     // console.log(data);
                     // console.log(tempGames);

                    setGames(getUnique(tempGames,'_id'));
                }
            }
        }

        if(utilDate !== undefined){
            fetchGame();
            
        }
    },[utilDate, checkedTeams]);

if(render === true){
        return (
            <div className="row">
                <div className="col-12">
                    {   
                        games && games.map((data) => {
                            return <Link  key={data._id} to={{pathname:`/games/${data.startDateEastern}/${data._id}`}}><GameItem data={data} key={data._id} /></Link>
                        })
                    }
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className={classnames('col-12', 'm-noFavoriteGames')}>
                    <p> No favorite Teams selected ... </p>
                </div>
            </div>
        )
    }

}

export default FavoGameList;