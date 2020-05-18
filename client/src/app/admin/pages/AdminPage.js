import React from 'react';
import { Route, Router, Redirect, Switch} from 'react-router-dom';

import * as Routes from '../../routes';

import { NoMatch } from '../../pages';

import UploadPage from './UploadPage';
import DashboardPage from './DashboardPage';
import EditGamedays from './EditGamedays';
import EditTeams from './EditTeams';
import EditStandings from './EditStandings';
import EditUsers from './EditUsers';
import ModifyUsers from './ModifyUsers';
import EditBoxscore from './EditBoxscore';
import ModifyGamedays from './ModifyGamedays';
import ModifyTeams from './ModifyTeams';
import ModifyBoxscore from './ModifyBoxscore';

const AdminPage = ({children}) => {
    return (
        <div>

            <Route exact path={Routes.BACKOFFICE_LANDING}>
                <Redirect to={Routes.BACKOFFICE_DASHBOARD}/>
            </Route>
            <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}/>
            <Route exact path={Routes.BACKOFFICE_UPLOAD} component={UploadPage}/>
            
            <Route exact path={Routes.BACKOFFICE_EDIT_GAMEDAYS} component={EditGamedays}/>
            <Route exact path={Routes.BACKOFFICE_MODIFY_GAMEDAYS} component={ModifyGamedays}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_TEAMS} component={EditTeams}/>
            <Route exact path={Routes.BACKOFFICE_MODIFY_TEAMS} component={ModifyTeams}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_STANDINGS} component={EditStandings}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_USERS} component={EditUsers}/>
            <Route exact path={Routes.BACKOFFICE_MODIFY_USERS} component={ModifyUsers}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_BOXSCORE} component={EditBoxscore}/>
            <Route exact path={Routes.BACKOFFICE_MODIFY_BOXSCORE} component={ModifyBoxscore}/>


        </div>
    )
}

export default AdminPage;