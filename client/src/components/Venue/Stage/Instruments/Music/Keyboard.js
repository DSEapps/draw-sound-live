import React, { Component } from 'react';
import Tone from "tone";

class Keyboard extends Component {

    componentDidMount() {
        this.initKeyBoard();
    }

    componentDidUpdate(prevProps) {
        //Add event listener if user has become performer
        if (!prevProps.isPerformer && this.props.isPerformer) {
            window.addEventListener("keydown", this.keyDown);
            window.addEventListener("keyup", this.keyUp);
        }
        //Remove event listener if user has stopped performing       
        else if (prevProps.isPerformer && !this.props.isPerformer) {
            window.removeEventListener("keydown", this.keyDown);
            window.removeEventListener("keyup", this.keyUp);
        }
        //Register key up keyDown was true and is now false
        if (prevProps.instrumentProps.location.keyDown && !this.props.instrumentProps.location.keyDown) {
            this.registerKeyup();
        }
        //Register key down if key is down and key val is different than it was before         
        else if (
            this.props.instrumentProps.location.keyDown && prevProps.instrumentProps.location.keyVal !== this.props.instrumentProps.location.keyVal 
            || !prevProps.instrumentProps.location.keyDown && this.props.instrumentProps.location.keyDown) {
            this.registerKeyDown(this.props.instrumentProps.location.keyVal);
        }
    }

    initKeyBoard = () => {
        this.reverb = new Tone.Freeverb(.5).toMaster();
        this.key = new Tone.Synth(
            {
                oscillator: {
                    type: 'sine'
                },
                envelope: {
                    attack: 0,
                    decay: 0.3,
                    sustain: 1,
                    release: 1
                }
            }
        ).connect(this.reverb);
        this.key.volume.value = -10;
    }

    //Fired by performer's actual key press
    keyDown = (event) => {
        this.props.handleKeyDown(event.key.toLowerCase())
    }
    //Fired by performer's actual key press
    keyUp = () => {
        this.props.handleKeyUp();
    }
    //Fired by props update
    registerKeyDown = (key) => {
        let n;
        switch (key) {
            case 'a':
            case 'q':
            case 'z':
                n = "c";
                break;
            case 's':
            case 'w':
            case 'x':
                n = "c#";
                break;
            case 'd':
            case 'e':
            case 'c':
                n = "d";
                break;
            case 'f':
            case 'r':
                n = "d#";
                break;
            case 'g':
            case 't':
            case 'b':
                n = "e";
                break;
            case 'h':
            case 'y':
            case 'n':
                n = "f";
                break;
            case 'j':
            case 'u':
            case 'm':
                n = "f#";
                break;
            case 'k':
            case 'i':
                n = "g";
                break;
            case 'l':
            case 'o':
                n = "g#";
                break;
        }

        let octave;
        const highNotes = ["q", "w", "e", "r", "t", "y", "u", "i", "o"];
        const midNotes = ["a", "s", "d", "f", "g", "h", "j","k","l"];
        if (highNotes.includes(key)) {
            octave = "4"
        } else if (midNotes.includes(key)) {
            octave = "3";
        } else {
            octave = "2";
        }

        if (n) {
            this.key.triggerAttack(n + octave);
        } else {
            console.log("that key doesn't do anything.")
        }
    }

    //Fired by props update
    registerKeyup = () => {
        this.key.triggerRelease();
    }
    render() {
        const divStyle = {
            display: 'none'
        }

        return <div style={divStyle}></div>
    }
}


export default Keyboard;
