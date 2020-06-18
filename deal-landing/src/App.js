import React from 'react';
import { Route, Switch, Redirect, useLocation, useRouteMatch } from 'react-router-dom'
import './App.css';
// import LandingPage from './containers/LandingPage/LandingPage';
// import SuccessPage from './containers/SuccessPage/SuccessPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import RedeemPage from './containers/RedeemPage/RedeemPage';
import VoucherPage from './containers/VoucherPage/VoucherPage';

function App() {
    return (
        <div className="App">
            <Switch>
                {/* <Route exact path="/:merchant_id">
                    <LandingPage />
                </Route>
                <Route exact path="/:merchant_id/:transaction_id/:session_id/success">
                    <SuccessPage />
                </Route> */}
                <Route exact path={`/redeem/:transaction_id/:product_id`}>
                    <RedeemPage />
                </Route>
                <Route exact path={`/voucher`}>
                    <VoucherPage />
                </Route>
                <Route path="/">
                    <NotFoundPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
