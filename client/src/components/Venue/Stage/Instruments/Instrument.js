import React, { Component } from 'react';
import Art from "./Art/Art";
import Music from "./Music/Music";
import io from 'socket.io-client';
const socket = io();

class Instrument extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //title of div that mouse is in, e.g. "distortion"
            activeNode: null,
            //is mouse held down?
            mouseDown: false,
            x: 0,
            y: 0
        }
        socket.on('performance', (msg) => {
            //this i firing!
            this.setState({ activeNode: msg.activeNode, mouseDown: msg.mouseDown, x: msg.x, y: msg.y })
        })
    }

    // componentDidMount() {
    //     socket.on('performance', (msg) => {
    //         console.log("HELLO");
    //         this.setState({ msg })
    //     })
    // }

    componentWillUpdate(nextProps, nextState) {
        this.props.isPerformer ? socket.emit('performance', nextState) : null
    }


    handleMouseMove = (x, y) => {
        this.setState({ x: x, y: y });
    }

    handleClick = (boolean) => {
        this.setState({ mouseDown: boolean })
    }

    handleNodeChange = (node) => {
        this.setState({ activeNode: node });
    }

    render() {
        return (
            <div className="instrument">
                <Art location={this.state} />
                <Music
                    location={this.state}
                    handleNodeChange={this.handleNodeChange}
                    handleClick={this.handleClick}
                    handleMouseMove={this.handleMouseMove}
                    soundUpdaters={this.props.soundUpdaters} />
            </div>
        );
    }
}

export default Instrument;
