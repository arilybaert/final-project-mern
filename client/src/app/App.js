import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import {HomePage, StandingsPage, FavoritesPage} from './pages';
import * as Routes from './routes'
import { ApiProvider } from './services';

// STYLES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <ApiProvider>

        <Router basename='/'>
          <Switch>

            <Route path={Routes.LANDING} exact component={HomePage}/>
            <Redirect from={Routes.HOME} to={Routes.LANDING}/>
            <Route path={Routes.STANDINGS} exact component={StandingsPage}/>
            <Route path={Routes.FAVORITES} exact component={FavoritesPage}/>


          </Switch>
        </Router>

      </ApiProvider>

    </div>
  );
}

export default App;
