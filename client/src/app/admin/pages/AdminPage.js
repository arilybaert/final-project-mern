import React from 'react';
import { Route, Redirect} from 'react-router-dom';

import * as Routes from '../../routes';

import UploadPage from './UploadPage';
import DashboardPage from './DashboardPage';
import EditGamedays from './EditGamedays';
import EditTeams from './EditTeams';
import EditStandings from './EditStandings';
import EditUsers from './EditUsers';
import ModifyUsers from './ModifyUsers';
import EditBoxscore from './EditBoxscore';

const AdminPage = ({children}) => {

    return (
        <div>
            <Route exact path={Routes.BACKOFFICE_LANDING}>
                <Redirect to={Routes.BACKOFFICE_DASHBOARD}/>
            </Route>
            <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}/>
            <Route exact path={Routes.BACKOFFICE_UPLOAD} component={UploadPage}/>

            <Route exact path={Routes.BACKOFFICE_EDIT_GAMEDAYS} component={EditGamedays}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_TEAMS} component={EditTeams}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_STANDINGS} component={EditStandings}/>
            <Route exact path={Routes.BACKOFFICE_EDIT_USERS} component={EditUsers}/>
            <Route path={Routes.BACKOFFICE_MODIFY_USERS} component={ModifyUsers}/>
            <Route path={Routes.BACKOFFICE_EDIT_BOXSCORE} component={EditBoxscore}/>
            
            
        </div>
    )
}

export default AdminPage;