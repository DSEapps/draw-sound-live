import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Venue from "./components/Venue";
import { Security, ImplicitCallback } from '@okta/okta-react';
import LoginPage from './components/Auth/LoginPage';

// Created for Okta
import Home from './Home';
const config = {
  issuer: 'https://dev-199627.oktapreview.com',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oae8l8wbnX33qC9A0h7'
}



class App extends Component {
  render(){
    return (
  <Router>
    <Security issuer={config.issuer}
              client_id={config.client_id}
              redirect_uri={config.redirect_uri}
              >
      <Route path='/' exact={true} component={Home}/>
      <Route path="/login" component={LoginPage}/>
      <Route path='/implicit/callback' component={ImplicitCallback}/>
    </Security>
    {/* <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/venue" component={Venue} />
      </Switch>
    </div> */}
  </Router>
    );
  }
}

export default App;
