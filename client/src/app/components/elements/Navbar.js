import React from 'react';
import classnames from 'classnames';
import { IoIosPerson } from 'react-icons/io';
import * as Routes from '../../routes';
import { Link } from 'react-router-dom'



const Navbar = () => {
    return (
        <div className={classnames('row', 'o-title')}>
            <div className="col-10">
                <span className={classnames("a-title__bold", "a-title")}>Banana Boat </span>
                <span className={classnames("a-titlte__normal", "a-title")}>Crew</span>
            </div>
            <div className={classnames("col-2")}>
                <Link className='a-accountLogo' to={Routes.SIGNIN}>
                    <IoIosPerson size='2em'/>
                </Link>

            </div>
        </div>
    )
}

export default Navbar;