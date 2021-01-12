import React from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'src/pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Auth from './servises/auth';


const isAuth = () => !!Auth.getUser();

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route
        path="/dashboard"
        render={() => (isAuth() ? <Dashboard /> : <Redirect to="/login" />)}
      />
    </Switch>
  </Router>
);

export { Routes as default };
