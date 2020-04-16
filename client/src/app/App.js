import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {NBAContextProvider} from './components/context';
import { IconContext } from 'react-icons';

import {HomePage, StandingsPage, FavoritesPage, GameStats, SignIn} from './pages';
import {AdminPage} from './admin/pages';
import * as Routes from './routes'
import { ApiProvider, AuthProvider } from './services';

// STYLES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <AuthProvider>
      <ApiProvider>

        <Router basename='/'>
          <Switch>
            <NBAContextProvider>


            <Route path={Routes.LANDING} exact component={HomePage}/>
            <Redirect from={Routes.HOME} to={Routes.LANDING}/>
            <Route path={Routes.GAMESTATS} exact component={GameStats}/>
            <Route path={Routes.STANDINGS} exact component={StandingsPage}/>
            <Route path={Routes.FAVORITES} exact component={FavoritesPage}/>
            <Route path={Routes.SIGNIN} exact component={SignIn}/>
            
            <Route path={Routes.BACKOFFICE_LANDING} exact component={AdminPage}/>

            </NBAContextProvider>
          </Switch>
        </Router>

      </ApiProvider>
      </AuthProvider>

    </div>
  );
}

export default App;
