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
        <div>
            <h3> ----> This is the number of connected users: {this.state.clientsCount}</h3>
        </div>        
        );
    }; 


}

export default Audience;

