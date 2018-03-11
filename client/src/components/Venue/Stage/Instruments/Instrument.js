import React, { Component } from 'react';
import Art from "./Art/Art";
import Music from "./Music/Music";

class Instrument extends Component {
    //note from Evan: should try componentDidMount instead of constructor
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
        this.props.socket.on('performance', (msg) => {
            this.setState({ activeNode: msg.activeNode, mouseDown: msg.mouseDown, x: msg.x, y: msg.y })
        })
    }

    componentWillUpdate(nextProps, nextState) {
        this.props.isPerformer ? this.props.socket.emit('performance', nextState) : null
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
                <Art
                    location={this.state}
                    performer={this.props.performer}
                />
                <Music
                    location={this.state}
                    isPerformer={this.props.isPerformer}
                    handleNodeChange={this.handleNodeChange}
                    handleClick={this.handleClick}
                    handleMouseMove={this.handleMouseMove}
                    soundUpdaters={this.props.soundUpdaters} />
            </div>
        );
    }
}

export default Instrument;
