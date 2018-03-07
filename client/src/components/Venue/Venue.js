import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";
import Stage from "./Stage/Stage";
import Marquee from "./Marquee/Marquee";
import Chat from "./Chat/Chat";

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


        <div className="row">
          <div className="col-md-12">
            <Stage />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Marquee name="Scott" perf="11" last="Jan 5, 2018" claps="314"/>
          </div>
        </div>        

        <div className="row">
          <div className="col-md-12">
            <div className="well well-lg">
              <Chat name="dpk@gmail.com" comment="This UI is sucky"/>
              <Chat name="ejk@gmail.com" comment="Yes, I agree"/>
              <Chat name="abc@gmail.com" comment="There needs to be a lot of work done"/>
              <Chat name="efg@gmail.com" comment="This will have to be a function call"/>
              <Chat name="hij@gmail.com" comment="In order to iterate thru the comments in real time"/>
              <Chat name="klm@gmail.com" comment="Good luck with that!"/>
            </div>
          </div>
        </div>   

      </div>      
    );
  }
}

export default Venue;



