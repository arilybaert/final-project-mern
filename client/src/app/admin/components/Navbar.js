import React from 'react';
import {Link} from 'react-router-dom';

import  * as Routes  from '../../routes';
const Navbar = () => {

    return (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Backoffice</a>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
        <Link to={Routes.BACKOFFICE_DASHBOARD} class="nav-link" >Home</Link>
      </li>
      <li class="nav-item">
        <Link to={Routes.BACKOFFICE_UPLOAD} class="nav-link" >Upload</Link>
      </li>
      <li class="nav-item">
        <Link to={Routes.LANDING} class="nav-link" >Web app</Link>
      </li>
      
    </ul>
    <div class="my-2 my-lg-0">
        <Link to={Routes.LANDING} class="text-danger" >Log out</Link>
      </div>
  </div>
</nav>
    )
}

export default Navbar;