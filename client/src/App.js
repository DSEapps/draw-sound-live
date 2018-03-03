import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Venue from "./pages/Venue";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/venue" component={Venue} />
      </Switch>
    </div>
  </Router>;

export default App;
