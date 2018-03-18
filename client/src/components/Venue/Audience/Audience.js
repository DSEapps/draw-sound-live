import React, { Component } from 'react';
import io from 'socket.io-client';
// const socket = io();



class Audience extends Component {
    state = {
        clientsCount: 0
    }

    componentDidMount() {
        //Note from Evan: we could also try asking for the current client here instead of merely listening
        //This might address the issue with 0 people showing until someone else joins.
        this.props.socket.on('clientsCount', (clientsCount) => {
            this.setState({ clientsCount: clientsCount })
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

