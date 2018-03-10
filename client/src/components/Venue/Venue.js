import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import Stage from "./Stage/Stage";
import Marquee from "./Marquee/Marquee";
import Chat from "./Chat/Chat";
import Chatlog from "./Chat/Chatlog";
import Perform from "./Perform"
import './Venue.css';

class Venue extends Component {
  state = {
    isPerformer: false,
    performanceOn: false,
  };

  startPerformance = () => {
    this.setState({ isPerformer: true, performanceOn: true })
  }

  render() {
    return (
      <div className="">
        <div className="">
          <Perform onClick={this.startPerformance} />
        </div>
        <Stage />
        <div className="">
          <Marquee name="Scott" perf="11" last="Jan 5, 2018" claps="314" />
        </div>
        <div className="row">
          <Chat />
        </div>
      </div>

      // Bootswatch Code
      // <div className="container">
      //   <div className="row">
      //     <div className="col-md-12">
      //       <div className="jumbotron">
      //         <h1>Venue</h1>
      //         <p>This is in the render return statement in Components/Venue</p>
      //         <p>Our core app is rendered here...</p>
      //         <button onClick={this.performClick} className="btn btn-primary btn-lg">Perform</button>
      //       </div>
      //     </div>
      //   </div>

      //   <Stage />

      //   <div className="row">
      //     <div className="col-md-12">
      //       <Marquee name="Scott" perf="11" last="Jan 5, 2018" claps="314"/>
      //     </div>
      //   </div>        

      //   <div className="row">
      //     <div className="col-md-12">
      //       <div className="well well-lg">
      //         <Chat />
      //         <Chatlog name="dpk@gmail.com" comment="This UI is sucky"/>
      //         <Chatlog name="ejk@gmail.com" comment="Yes, I agree"/>
      //         <Chatlog name="abc@gmail.com" comment="There needs to be a lot of work done"/>
      //         <Chatlog name="efg@gmail.com" comment="This will have to be a function call"/>
      //         <Chatlog name="hij@gmail.com" comment="In order to iterate thru the comments in real time"/>
      //         <Chatlog name="klm@gmail.com" comment="Good luck with that!"/>
      //       </div>
      //     </div>
      //   </div>   

      // </div> 
      // // Bootswatch Code

    );
  }
}



export default Venue;


