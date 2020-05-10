import React from 'react';
import { Route, Redirect} from 'react-router-dom';

import * as Routes from '../../routes';

import UploadPage from './UploadPage';
import DashboardPage from './DashboardPage';

const AdminPage = ({children}) => {

    return (
        <div>
            <Route exact path={Routes.BACKOFFICE_LANDING}>
                <Redirect to={Routes.BACKOFFICE_DASHBOARD}/>
            </Route>
            <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage}/>
            <Route exact path={Routes.BACKOFFICE_UPLOAD} component={UploadPage}/>

        </div>
    )
}

export default AdminPage;