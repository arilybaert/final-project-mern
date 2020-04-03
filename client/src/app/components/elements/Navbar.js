import React from 'react';
import classnames from 'classnames';
import { IoIosPerson } from 'react-icons/io';



const Navbar = () => {
    return (
        <div className={classnames('row', 'o-title')}>
            <div className="col-10">
                <span className={classnames("a-title__bold", "a-title")}>Banana Boat </span>
                <span className={classnames("a-titlte__normal", "a-title")}>Crew</span>
            </div>
            <div className={classnames("col-2", "o-accountLogo")}>
            <IoIosPerson size='2.1rem'/>

            </div>
        </div>
    )
}

export default Navbar;