import './App.css';

import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyles } from "./styles/global";

import jwt from "./services/auth";
import axios from "axios";

import LoadingImage from "./assets/loading.svg";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import EditAccount from "./pages/EditAccount";
import EditPassword from "./pages/EditPassword";
import NotFound from "./pages/NotFound";
import EditUser from './pages/EditUser';
import Unauthorized from './pages/Unauthorized';
import ConfirmEmail from './pages/ConfirmEmail';
import AboutProject from './pages/AboutProject';
import PlansProject from './pages/PlansProject';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      jwt.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const AuthorizedRoute = ({ component: Component, ...rest }) => (
  <Route
    {... rest}
    render={props =>
      jwt.isAuthorized() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/unauthorized", state: { from: props.location } }} />
      )
    }
  />
);

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Check if have a refresh token in LocalStorage
    if(jwt.getRefreshToken()) {
      axios.post('/api/auth/refresh-token', {
        refreshToken: jwt.getRefreshToken()
      })
        .then(response => {
          //Refresh Token Valid
          if(response.data.success) {
            jwt.setAccessToken(response.data.accessToken);
            jwt.setUser(response.data.user);
          }
        })
        .catch(error => {
          //Refresh Token Invalid/Expired
          jwt.removeRefreshToken();
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return(
      <div style={{width: '100vh', height: '100vh', display: 'flex', margin: '0 auto'}}>
        <img src={LoadingImage} alt={'Loading'}/>;
      </div>
    );
  }

  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/registrar" exact component={SignUp} />
          <Route path="/logout" exact render={props => {
            jwt.removeUser();
            jwt.removeAccessToken();
            jwt.removeRefreshToken();
            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          }} 
          />
          <Route path='/confirmar-email/:emailToken' exact component={ConfirmEmail} />
          <Route path='/sobre-projeto' exact component={AboutProject} />
          <Route path='/planos-projeto' exact component={PlansProject} />

          <AuthorizedRoute path="/dashboard" component={Dashboard} />
          <AuthenticatedRoute path="/editar-conta" component={EditAccount} />
          <AuthenticatedRoute path="/alterar-senha" component={EditPassword} />
          <AuthorizedRoute path="/users/editar/:id" component={EditUser} />

          <Route path="/unauthorized" component={Unauthorized}/>
          <Route path="*" component={NotFound} />
          
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
