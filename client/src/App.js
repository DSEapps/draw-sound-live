import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Venue from "./components/Venue";
import io from 'socket.io-client';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router';

class App extends Component {

  state = {
    name: null,
    id: null,
    upClaps: null,
    downClaps: null
  }

  handleUserData = (data) => {
    this.setState({
      name: data.data.name,
      id: data.data.id,
      upClaps: data.data.upClaps,
      downClaps: data.data.downClaps
    })
  }

  updateClaps = (data) => {
    this.setState({
      upClaps: data.upClaps,
      downClaps: data.downClaps
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/venue" render={() => <Venue userInfo={this.state} updateClaps={this.updateClaps} />} />
          <Route exact path="/login" render={() => <Login handleUserData={this.handleUserData} userInfo={this.state} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
