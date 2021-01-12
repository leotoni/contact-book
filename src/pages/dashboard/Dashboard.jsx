import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { Dashboard } from './styled/dashboard';
import ContactList from '../contact-list/ContactList';
import ContactPage from '../contact/Contact';

const DashboardPage = () => (
  <Dashboard>
    <Navbar />
    <Switch>
      <Route
        path="/dashboard/contact-list"
        render={props => (<ContactList {...props} />)}
      />
      <Route
        path="/dashboard/contact/:id"
        render={props => (<ContactPage {...props} />)}
      />
      <Redirect to="/dashboard/contact-list" />
    </Switch>
  </Dashboard>
);

export default DashboardPage;
