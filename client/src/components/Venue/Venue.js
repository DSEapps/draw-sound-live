import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";

class Venue extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

  performClick = () => {
    // enter Stage to perform
    this.props.history.push("/venue");
}

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Venue</h1>
              <p>This is in the render return statement in Components/Venue</p>
              <p>Our core app is rendered here...</p>
              <button onClick={this.performClick} className="btn btn-primary btn-lg">Perform</button>
            </div>
          </div>  
        </div>
      </div>      
    );
  }
}

export default Venue;



