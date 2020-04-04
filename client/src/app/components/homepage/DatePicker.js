import React from 'react';
import classnames from 'classnames';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
const DatePicker = () => {

    return (
        <div className="row">
            <div className={classnames("col-12", "o-datePicker")}>
                <div className="row">

                    <div className={classnames("col-4", "m-arrow")}>
                        <IoIosArrowBack size='2rem' color='white'/>
                    </div>

                    <div className="col-4">
                        <span className="a-currentDate">20/02/2020</span>
                    </div>

                    <div className={classnames("col-4", "m-arrow")} >
                        <IoIosArrowForward size='2rem' color='white'/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatePicker;