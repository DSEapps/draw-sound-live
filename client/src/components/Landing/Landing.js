import React, { Component } from "react";
import API from "../../utils/API";
import Vector from './images/drawsound.svg';

class Landing extends Component {

  enterClick = () => {
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="landing-root wrapper">
        <div className="content center centerFlex">
          <img src={Vector} />
          <button className="button-primary" onClick={this.enterClick}>Live</button>
          <footer> <em>All rights reserved (c) 2018 Charles Bowden, Scott Bower, Evan Harrison, and David Killian.</em></footer>
        </div>
      </div>
    );
  }
}

export default Landing;



