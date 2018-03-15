import React, { Component } from 'react';
import io from 'socket.io-client';
// const socket = io();



class Audience extends Component {
    state = {
        clientsCount: 0
    }

    componentDidMount() {
        this.props.socket.on('clientsCount', (clientsCount) => {
            this.setState({ clientsCount: clientsCount })
          });
    }

    componentDidUpdate() {
    }

    render() 
    {
        return (
        <p> {this.state.clientsCount} Humans Here</p>
        );
    }; 


}

export default Audience;

