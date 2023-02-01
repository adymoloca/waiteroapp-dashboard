import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import HomePage from '../../pages/Private/home-page/home-page';
import StatisticsPage from '../../pages/Private/statistics/statistics';
import UsersPage from '../../pages/Private/users/users';
import ResetPassword from '../../pages/reset-password/reset-password';
import Overview from '../../pages/overview/overview';
import Clients from '../../pages/Private/clients/clients';
// import WorkStaff from '../../pages/work-staff/work-staff';
import Menus from '../../pages/menus/menus';
import Drinks from '../../pages/drinks/drinks';
import Extra from '../../pages/extra/extra';
import Tables from '../../pages/tables/tables';
import Orders from '../../pages/orders/orders';
import Settings from '../../pages/settings/settings';
import OnBoarding from '../../pages/onboarding/onboarding';
import Register from '../../pages/register/register';
import Checkout from '../../pages/checkout/checkout';
import { connect } from 'react-redux';

import './Routing.css';

const Routes = ({ user }) => {

    return (
        <BrowserRouter>
            <Switch >
                <Route exact path='/' component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/register" component={Register} />
                <ProtectedRoute exact path="/home" component={HomePage} user={user} />
                <ProtectedRoute exact path="/statistics" component={StatisticsPage} user={user} />
                <ProtectedRoute exact path="/users" component={UsersPage} user={user} />
                <ProtectedRoute exact path="/clients" component={Clients} user={user} />
                <ProtectedRoute exact path="/overview" component={Overview} user={user} />
                {/* <ProtectedRoute exact path="/work-staff" component={WorkStaff} user={user} /> */}
                <ProtectedRoute exact path="/menus" component={Menus} user={user} />
                <ProtectedRoute exact path="/drinks" component={Drinks} user={user} />
                <ProtectedRoute exact path="/extra" component={Extra} user={user} />
                <ProtectedRoute exact path="/tables" component={Tables} user={user} />
                <ProtectedRoute exact path="/orders" component={Orders} user={user} />
                <ProtectedRoute exact path="/settings" component={Settings} user={user} />
                <ProtectedRoute exact path="/on-boarding" component={OnBoarding} user={user} />
                <ProtectedRoute exact path="/checkout" component={Checkout} user={user} />
                <ProtectedRoute path="*" component={user?.role === 'admin' ? HomePage : Overview} />
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    user: state.adminReducer?.admin?.loggedIn ? state.adminReducer?.admin : state?.clientReducer?.client
})

export default connect(mapStateToProps, null)(Routes);