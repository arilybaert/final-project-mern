import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const BottomNav = () => {

    return (
        <div className={classnames("o-bottomNav", "row")}>
            <Link to={"/"} className="col m-bottomNav__element">
                    <img className="a-bottomNavLogo" alt="logo"></img>
                    <span>Home</span>
            </Link>

            <Link to={"/standings"} className={classnames("col", "m-bottomNav__element")}>
                    <img className="a-bottomNavLogo" alt="logo"></img>
                    <span>Standings</span>
            </Link>

            <Link to={"/favorites"} className={classnames("col", "m-bottomNav__element")}>
                    <img className="a-bottomNavLogo" alt="logo"></img>
                    <span>Favorites</span>
            </Link>
        </div>
    )
}

export default BottomNav;