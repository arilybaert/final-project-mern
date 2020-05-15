import React, { useState, useEffect, useContext } from 'react';
import {NBAContext} from '../context';
import classnames from 'classnames';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useApi } from '../../services';


const DatePicker = () => {
    const { utilDate,setUtilDate } = useContext(NBAContext);
    const { findGames } = useApi();

    const [standardDate, setStandardDate] = useState(new Date());
    const [readableDate, setReadableDate] = useState();
    const [nearestPastGameDate, setNearestPastGameDate] = useState();
    const [dataStatus, setDataStatus] = useState();

    // MAKE DATE READABLE
    const addZero = (input, n) => {
        let inputString = String(input);
        while(inputString.length < n) {
            inputString = `0${inputString}`;
        }
        return inputString;
    };


useEffect( () => {

            const date = standardDate;
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
    
            
            setReadableDate(`${addZero(day, 2)}/${addZero(month+1, 2)}/${year}`);
            setUtilDate(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
    
            // // SEARCH FOR NEAREST GAME IN THE PAST
            // let data = await findGames(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
            // while(data === false){
            //     const pastDate = standardDate;
            //     pastDate.setDate(pastDate.getDate()-1);
                
            //     const day = pastDate.getDate();
            //     const month = pastDate.getMonth();
            //     const year = pastDate.getFullYear();
                
            //     data = await findGames(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
            // };
            // setNearestPastGameDate(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
            // console.log(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);


});

    // DECREMENT DATE
    const handleLeftClick = () => {
        const date = standardDate;
        date.setDate(date.getDate()-1);
        setStandardDate(date);
        setReadableDate();
    }

    // INCREMENT DATE
    const handleRightClick = () => {
        const date = standardDate;
        date.setDate(date.getDate()+1);
        setStandardDate(date);
        setReadableDate();
    }

    const goNearestGameday = () => {
        const date = new Date(2020, 2, 10, 0, 0);
        setStandardDate(date)
        setReadableDate();
    }

    return (
        <div>
        <div className="row">
            <div className={classnames("col-12", "o-datePicker")}>
                <div className="row">

                        <div className={classnames("col-4", "m-arrow")} onClick={handleLeftClick}>
                            <IoIosArrowBack size='2em' color='white'/>
                        </div>

                    <div className="col-4">
                        <span className="a-currentDate">{readableDate}</span>
                    </div>

                    <div className={classnames("col-4", "m-arrow")} onClick={handleRightClick}>
                        <IoIosArrowForward size='2em' color='white'/>

                    </div>
                </div>
            </div>
        </div>
        {
        // dataStatus == false ?
         <div onClick={goNearestGameday}>Go to nearest gameday</div>
        // :
            // <div></div>
        }
</div>
    )
}

export default DatePicker;