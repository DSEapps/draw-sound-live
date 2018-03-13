import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Venue from "./components/Venue";
import LoginPage from './components/Auth/LoginPage';
import io from 'socket.io-client';

class App extends Component {

  //Hard-coded user info; waiting for auth process
  //Will all need to be NULL initially
  state = {
    name: "John",
    id: "555",
    upClaps: "25",
    downClaps: "66"
  }

  render() {
    const returnVenue = () => {
      return (
        <Venue
          userInfo={this.state}
        />
      );
    }


    return (
      <Router>
          <Switch>
            {/* for testing... */}
            <Route exact path="/" render={returnVenue} />
            <Route exact path="/landing" component={Landing} />
            {/* <Route exact path="/login" component={LoginPage} />
            <Route exact path="/venue" component={Venue} /> */}
          </Switch>
      </Router>
    );
  }
}

export default App;
