import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";
import Vector from './images/drawsound.svg';


class Landing extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

  enterClick = () => {
    this.props.history.push("/login");
}

  render() {
    return(
      <div className="landing-root wrapper">
        <div className="content center centerFlex">
          <img src={Vector}  />
          <button onClick={this.enterClick} className="btn btn-primary">Live</button>
          <footer> <em>All rights reserved (c) 2018 Charles Bowden, Scott Bower, Evan Harrison, and David Killian.</em></footer>
        </div>
      </div>      
    );
  }
}

export default Landing;



