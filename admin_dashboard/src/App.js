import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { AuthContext } from './context/AuthProvider';
import awsconfig from './aws-exports';
import Authentication from './containers/Authentication/Authentication';
import Registration from './containers/Authentication/Registration';
import Stripe from './containers/Authentication/StripeRegister/StripeRegister';
import Dashboard from './containers/Dashboard/Dashboard';
import queryString from 'query-string'

Amplify.configure(awsconfig);

export default function App(props) {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    let values = null
    if (location.search.length > 1) {
      values = queryString.parse(location.search)
      localStorage.setItem('stripe', values.code);
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard">
          {loggedIn ? (<Dashboard />) : (<Redirect to="/" />)}
        </Route>
        <Route path="/stripe">
        {loggedIn ? (<Stripe />) : (<Redirect to="/" />)}
        </Route>
        <Route path="/register/:merchant_id">
          <Registration />
        </Route>
        <Route path="/">
          <Authentication />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  )
};
