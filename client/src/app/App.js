import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {HomePage, StandingsPage, FavoritesPage} from './routes';

// STYLES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>

          <Route path="/" exact component={HomePage}/>
          <Route path="/standings/" exact component={StandingsPage}/>
          <Route path="/favorites/" exact component={FavoritesPage}/>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
