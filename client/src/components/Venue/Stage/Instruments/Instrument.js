import React, { Component } from 'react';
import Art from "./Art/Art";
import Music from "./Music/Music";

class Instrument extends Component {
    state = {
        //title of div that mouse is in, e.g. "distortion"
        activeNode: null,
        //is mouse held down?
        mouseDown: false,
        x: 0,
        y: 0
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
