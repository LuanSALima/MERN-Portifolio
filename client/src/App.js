import './App.css';

import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { isAuthenticated, isAdmin, logout } from "./services/auth";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import EditAccount from "./pages/EditAccount";
import EditPassword from "./pages/EditPassword";
import NotFound from "./pages/NotFound";
import EditUser from './pages/EditUser';
import Unauthorized from './pages/Unauthorized';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {... rest}
    render={props =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/unauthorized", state: { from: props.location } }} />
      )
    }
  />
);

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/registrar" exact component={SignUp} />
        <Route path="/logout" exact render={props => {
          logout(); 
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }} 
        />
        <AdminRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/editar-conta" component={EditAccount} />
        <PrivateRoute path="/alterar-senha" component={EditPassword} />
        <AdminRoute path="/users/editar/:id" component={EditUser} />

        <Route path="/unauthorized" component={Unauthorized}/>
        <Route path="*" component={NotFound} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
