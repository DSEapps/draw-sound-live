import React, { Component } from 'react';
import Art from "./Art/Art";
import Music from "./Music/Music";

class Instrument extends Component {

    state = {
        activeNode: null,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        mouseDown: false,
        x: 0,
        y: 0,
        keyVal: null,
        keyDown: false
    }

    //Get state updates from server
    componentDidMount() {
        this.props.socket.on('performance', (msg) => {
            this.setState({
                activeNode: msg.activeNode,
                left:msg.left,
                top:msg.top,
                width:msg.width,
                height:msg.height,
                mouseDown: msg.mouseDown, 
                x: msg.x, 
                y: msg.y, 
                keyVal: msg.keyVal, 
                keyDown: msg.keyDown,
            })
        })
    }

    //Emit state if performer
    componentWillUpdate(nextProps, nextState) {
        this.props.isPerformer ? this.props.socket.emit('performance', nextState) : null
    }

    //Reset state at end of performance
    componentDidUpdate(prevProps) {
        if (!prevProps.performer && this.props.performer) {
            this.setState({
                activeNode: null,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                mouseDown: false,
                x: 0,
                y: 0,
                keyVal: null,
                keyDown: false
            })
        }
    }


    handleMouseMove = (x, y) => {
        this.setState({ x: x, y: y });
    }

    handleClick = (boolean) => {
        this.setState({ mouseDown: boolean })
    }

    handleNodeChange = (node, left, top, width, height) => {
        this.setState({ activeNode: node, left: left, top: top, width: width, height: height });
    }

    handleKeyDown = (val) => {
        this.setState({ keyVal: val, keyDown: true })

    }

    handleKeyUp = () => {
        this.setState({ keyDown: false })
    }

    render() {
        return (
            <div className="instrument-wrapper">
                <Art
                    location={this.state}
                    live={this.props.performer}
                />
                <Music
                    location={this.state}
                    isPerformer={this.props.isPerformer}
                    handleNodeChange={this.handleNodeChange}
                    handleClick={this.handleClick}
                    handleMouseMove={this.handleMouseMove}
                    handleKeyDown={this.handleKeyDown}
                    handleKeyUp={this.handleKeyUp}
                    soundUpdaters={this.props.soundUpdaters} />
            </div>
        );
    }
}

export default Instrument;
