import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IoIosPodium } from 'react-icons/io';
import { IoIosHome } from 'react-icons/io';
import { IoIosStar } from 'react-icons/io';




const BottomNav = () => {

    return (
        <div className={classnames("o-bottomNav", "row")}>
            <Link to={"/"} className="col m-bottomNav__element">
                    <IoIosHome size='2em'/>
                    <span>Home</span>

            </Link>

            <Link to={"/standings"} className={classnames("col", "m-bottomNav__element")}>
                    <IoIosPodium text-shadow="0 0 3px #000" size='2em' />
                    <span>Standings</span>
            </Link>

            <Link to={"/favorites"} className={classnames("col", "m-bottomNav__element")}>
                    <IoIosStar size='2em'/>
                    <span>Favorites</span>

            </Link>
        </div>
    )
}

export default BottomNav;