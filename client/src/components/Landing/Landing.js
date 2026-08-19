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
          <button className="btn-landing" onClick={this.enterClick}>Enter Venue</button>
        </div>
        <footer>
          <p>All rights reserved (c) 2018</p>
          <p>Charles Bowden, Scott Bower, Evan Harrison, and David Killian.</p>
        </footer>
      </div>
    );
  }
}

export default Landing;



