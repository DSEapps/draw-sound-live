import React, { Component } from 'react';
import VectorX from '../_Assets/icon-x.svg';
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
            <div className="audience fixed-left">
                <div className="top">
                    <div className="counts"><strong>{this.state.clientsCount}</strong></div>
                    <img src={VectorX} alt=" " width="14" height="14" />
                </div>
                <div className="bottom">
                    <div className="description"><strong>Humans Here</strong></div>
                </div>
            </div>
        );
    }; 


}

export default Audience;

