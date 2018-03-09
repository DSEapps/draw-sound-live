import React, { Component } from 'react';
import Square from './Square';

class Music extends Component {

    //NOTE the math that happens on x and y might could happen on sound updaters func def (pass in x and y as params)

    //NO
    //pull in updaters
    //set state to default effects values
    //run all the updaters with state

    //YES
    //or push specific to each square and let it update itself!!!! this sounds good, e.g. here's your method, here's your values
    //each square will have it's own state of "active" or not
    render() {
        const soundUpdaters = this.props.soundUpdaters;
        //TODO create these Square components with a loop over the updaters (i.e. one square per updater)
        return (
            <div className="music">
                <Square
                    name="A"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.jcReverb}
                />
                <Square
                    name="B"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.distortion}
                />
                <Square
                    name="C"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.pingPongDelay}
                />
                <Square
                    name="D"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.tremolo}
                />
                <Square
                    name="E"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.pitchShift}
                />
                <Square
                    name="F"
                    instrumentProps={this.props}
                    soundUpdater={soundUpdaters.phaser}
                />

            </div>
        );
    }
}

export default Music;
