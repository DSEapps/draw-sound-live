import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";
import placeholder from './images/drawsound.png';


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
          <img src={placeholder}  />
          <button onClick={this.enterClick} className="btn btn-primary">Live</button>
        </div>
      </div>      
    );
  }
}

export default Landing;



