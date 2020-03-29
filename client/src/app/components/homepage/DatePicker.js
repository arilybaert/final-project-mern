import React from 'react';
import classnames from 'classnames';


const DatePicker = () => {

    return (
        <div className="row">
            <div className={classnames("col-12", "o-datePicker")}>
                <div className="row">

                    <div className={classnames("col-4", "m-arrow")}>
                        <img  title="arrow" alt="arrow" className={classnames("a-arrow", "a-arrow__transform")}></img>
                    </div>

                    <div className="col-4">
                        <span className="a-currentDate">20/02/2020</span>
                    </div>

                    <div className={classnames("col-4", "m-arrow")} >
                        <img  title="arrow" alt="arrow" className="a-arrow"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatePicker;