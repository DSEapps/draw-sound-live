import React, { Component } from 'react';
import Square from './Square';
import Keyboard from './Keyboard';


class Music extends Component {
    render() {
        const soundUpdaters = this.props.soundUpdaters;
        return (
            <div className="music-wrapper">
                <Keyboard
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    handleKeyDown={this.props.handleKeyDown}
                    handleKeyUp={this.props.handleKeyUp}
                />
                <Square
                    name="A"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.jcReverb}
                />
                <Square
                    name="B"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.filter}
                />
                <Square
                    name="C"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.vibratoTriangle}
                />
                <Square
                    name="D"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.vibratoSaw}
                />
                <Square
                    name="E"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.pitchShift}
                />
                <Square
                    name="F"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.phaser}
                />
                <Square
                    name="G"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.pingPongDelay}
                />
                <Square
                    name="H"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.tremolo}
                />
                 <Square
                    name="I"
                    isPerformer={this.props.isPerformer}
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.distortion}
                />
            </div>
        );
    }
}

export default Music;
