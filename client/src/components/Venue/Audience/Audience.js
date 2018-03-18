import React, { Component } from 'react';
import io from 'socket.io-client';
// const socket = io();



class Audience extends Component {
    state = {
        clientsCount: 0
    }

    componentDidMount() {
        // Socket.on listener waiting for emissions from the server when a new client joins
        this.props.socket.on('clientsCount', (clientsCount) => {
            this.setState({ clientsCount: clientsCount });
          });

        // Socket.emits signal "get initial number of clients" using getInitialClientsCount "channel"
        this.props.socket.emit('getInitialClientsCount', true);

        // Socket.on listener waits for response (data) using initialClientsCount "channel"    
        this.props.socket.on('initialClientClount', (data) => {
            this.setState({ clientsCount: data});
        });

    }

    render() 
    {
        return (
            <div className="audience fixed-left">
                <div className="top">
                    <div className="counts"><strong>{this.state.clientsCount}</strong></div>
                        <svg className="indicators" x="0px" y="0px" viewBox="0 0 14 14">
                            <g>
                                <g>
                                    <rect className="m0" />
                                </g>
                                <g>
                                    <line className="m1" x1="10.5" y1="3.5" x2="3.5" y2="10.5"/>
                                    <line className="m1" x1="3.5" y1="3.5" x2="10.5" y2="10.5"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                <div className="bottom">
                    <div className="description"><strong>Humans Here</strong></div>
                </div>
            </div>
        );
    }; 


}

export default Audience;

