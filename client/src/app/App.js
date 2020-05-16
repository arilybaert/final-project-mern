import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import {createHashHistory } from 'history';
import {NBAContextProvider} from './components/context';
import { IconContext } from 'react-icons';

import {HomePage, StandingsPage, FavoritesPage, FavoriteEditPage, Boxscore, SignIn, NoMatch} from './pages';
import {AdminPage} from './admin/pages';
import * as Routes from './routes'
import { ApiProvider, AuthProvider } from './services';

// STYLES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { IoIosAdd } from 'react-icons/io';

// const history = createHashHistory();

/*
<Route exact path={Routes.LANDING} component={HomePage}/>
            <Redirect from={Routes.HOME} to={Routes.LANDING}/>
            <Route path={Routes.BOXSCORE}  component={Boxscore}/>
            <Route path={Routes.STANDINGS}  component={StandingsPage}/>
            <Route path={Routes.FAVORITES}  component={FavoritesPage}/>
            <Route path={Routes.FAVORITES_EDIT} exact component={FavoriteEditPage}/>
            <Route path={Routes.SIGNIN}  component={SignIn}/>
            
            <Route path={Routes.BACKOFFICE_LANDING} exact component={AdminPage}/>
            */

function App() {
  return (
    <div className="container">
      <AuthProvider>
      <ApiProvider>
            <NBAContextProvider>

        <Router >
          <Switch>

            <Route exact path={Routes.LANDING} component={HomePage}/>
            {/* <Redirect from={Routes.HOME} to={Routes.LANDING}/> */}
            <Route path={Routes.BOXSCORE} component={Boxscore}/>
            <Route path={Routes.STANDINGS} component={StandingsPage}/>
            <Route path={Routes.FAVORITES} exact component={FavoritesPage}/>
            <Route path={Routes.FAVORITES_EDIT} exact component={FavoriteEditPage}/>

            <Route path={Routes.SIGNIN}  component={SignIn}/>
            
            <Route path={Routes.BACKOFFICE_LANDING} component={AdminPage} />
            <Route component={NoMatch} />

          </Switch>
        </Router>
            </NBAContextProvider>

      </ApiProvider>
      </AuthProvider>

    </div>
  );
}

export default App;
