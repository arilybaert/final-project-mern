import React, { useState, useEffect, useContext } from 'react';
import {NBAContext} from '../context';
import classnames from 'classnames';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const DatePicker = () => {
    const { setUtilDate } = useContext(NBAContext);

    const [standardDate, setStandardDate] = useState(new Date());
    const [readableDate, setReadableDate] = useState();


    // MAKE DATE READABLE
    const addZero = (input, n) => {
        let inputString = String(input);
        while(inputString.length < n) {
            inputString = `0${inputString}`;
        }
        return inputString;
    };


useEffect(() => {
    
        const date = standardDate;
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

            // // TIME STRING UTILITIES e.g. ( 20200420 )
            // setUtilDate(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
            // setReadableDate(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);
            // return `${year}${addZero(month+1, 2)}${addZero(day, 2)}`;

            // TIME STRING USER INTERFACE e.g.( 20/04/2020 )
            //return `${addZero(day, 2)}/${addZero(month+1, 2)}/${year}`;
            
        setReadableDate(`${addZero(day, 2)}/${addZero(month+1, 2)}/${year}`);
        setUtilDate(`${year}${addZero(month+1, 2)}${addZero(day, 2)}`);

});

    // DECREMENT DATE
    const handleLeftClick = () => {
        const date = standardDate;
        date.setDate(date.getDate()-1);
        setStandardDate(date);
        console.log('click');
        setReadableDate();
    }

    // INCREMENT DATE
    const handleRightClick = () => {
        const date = standardDate;
        date.setDate(date.getDate()+1);
        setStandardDate(date);
        setReadableDate();
    }


    return (
        <div className="row">
            <div className={classnames("col-12", "o-datePicker")}>
                <div className="row">

                        <div className={classnames("col-4", "m-arrow")} onClick={handleLeftClick}>
                            <IoIosArrowBack size='2rem' color='white'/>
                        </div>

                    <div className="col-4">
                        <span className="a-currentDate">{readableDate}</span>
                    </div>

                    <div className={classnames("col-4", "m-arrow")} onClick={handleRightClick}>
                        <IoIosArrowForward size='2rem' color='white'/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatePicker;