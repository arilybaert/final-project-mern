import React from 'react';
import {Link} from 'react-router-dom';

import  * as Routes  from '../../routes';
const Navbar = () => {

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <a className="navbar-brand" href="#">Backoffice</a>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
        <Link to={Routes.BACKOFFICE_DASHBOARD} className="nav-link" >Home</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_UPLOAD} className="nav-link" >Upload</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_EDIT_GAMEDAYS} className="nav-link" >Gamedays</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_EDIT_BOXSCORE} className="nav-link" >Boxscore</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_EDIT_TEAMS} className="nav-link" >Teams</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_EDIT_STANDINGS} className="nav-link" >Standings</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.BACKOFFICE_EDIT_USERS} className="nav-link" >Users</Link>
      </li>
      <li className="nav-item">
        <Link to={Routes.LANDING} className="nav-link text-warning" > Return to Web-app</Link>
      </li>
    </ul>
    <div className="my-2 my-lg-0">
        <Link to={Routes.LANDING} className="text-danger" >Log out</Link>
      </div>
  </div>
</nav>
    )
}

export default Navbar;