import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import Stage from "./Stage/Stage";
// import Marquee from "./Marquee/Marquee";
import Audience from "./Audience/Audience";
import Chat from "./Chat/Chat";
import Perform from "./Perform";
import Applause from "./Applause";
import io from 'socket.io-client';
const socket = io();

class Venue extends Component {

  state = {
    performer: null,
    isPerformer: false
  };

  componentDidMount() {

    //Kick person back to landing if they have no id in the App's state.
    if (!this.props.userInfo.id) {
      this.props.history.push("/");
    }
    
    //check server immediately to see if performance is happening
      socket.emit('performance check');
      socket.on('performance check', (response) => {
        if (response) {
          this.setState({ performer: response })
        }
      })

    socket.on('start', (performer) => {
      this.setState({ performer: performer });
    });
    socket.on('stop', () => {
      this.setState({ performer: null, isPerformer: false })
    });
  }

  startPerformance = () => {
    socket.emit('start', this.props.userInfo);
    this.setState({ isPerformer: true })
  }

  stopPerformance = () => {
    socket.emit("stop");
  }

  render() {
    return (
      <div className="venue-root wrapper">
        <div className="content center centerFlex">
            <Perform
              startPerformance={this.startPerformance}
              stopPerformance={this.stopPerformance}
              performer={this.state.performer}
              isPerformer={this.state.isPerformer}
              userInfo={this.props.userInfo} />
            <Stage
              socket={socket}
              performer={this.state.performer}
              isPerformer={this.state.isPerformer} />     
        </div>
         {this.state.performer
          ? <Applause
            socket={socket}
            updateClaps={this.props.updateClaps}
            userInfo={this.props.userInfo}
            stopPerformance={this.stopPerformance}
            performer={this.state.performer}
            isPerformer={this.state.isPerformer} />
          : null}
        <Audience
            socket={socket} />
        <Chat
          socket={socket}
          userInfo={this.props.userInfo} />
      </div>

    );
  }
}



export default withRouter(Venue);


