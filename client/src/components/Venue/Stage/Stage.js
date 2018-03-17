import React, { Component } from 'react';
import Instrument from "./Instruments/Instrument";
import Tone from "tone";
const audioURLS = [
  "https://ia600206.us.archive.org/11/items/AliceColtrane-TuriyaAndRamakrishna/AliceColtrane-TuriyaAndRamakrishna.mp3",
  "https://ia801200.us.archive.org/4/items/78_i-want-a-hippopotamus-for-christmas_vicki-dale-the-peter-pan-orchestra_gbia0000281a/I%20Want%20A%20Hippopotamus%20For%20Christmas%20-%20Vicki%20Dale.mp3",
  "https://ia800405.us.archive.org/24/items/DEBUSSYStringQuartetInGMinor-NEWTRANSFER/01.I.AnimEtTrsDecid.mp3",
  "https://ia800708.us.archive.org/34/items/Classical_Sampler-9615/Kevin_MacLeod_-_Gymnopedie_No_1.mp3"
];

class Stage extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.performer) {
      this.setUpInstrument();
    } else if (prevProps.performer && !this.props.performer) {
      this.stopInstrument()
    }
  }

  stopInstrument = () => {
    console.log("stop the instrument...");
    this.player.stop();
  }

  //TODO - put this function in utils
  setUpInstrument = () => {
    this.fx = {
      //default values
      compressor: new Tone.Compressor(-30, 3),
      distortion: new Tone.Distortion(0),
      filter: new Tone.Filter({
        type: 'lowpass',
        frequency: 1000,
      }),
      tremolo: new Tone.Tremolo(0, 0).start(),
      pingpong: new Tone.PingPongDelay(0, .1),
      jcreverb: new Tone.JCReverb(0),
      pitchShift: new Tone.PitchShift(0),
      phaser: new Tone.Phaser(0),
      vibratoTriangle: new Tone.Vibrato({
        maxDelay: 0.5,
        frequency: 5,
        depth: .1,
        type: 'triangle'
      }),
      vibratoSaw: new Tone.Vibrato({
        //change from .005 to .05  
        maxDelay: .4,
        frequency: 0,
        depth: .2,
        type: 'sawtooth'
      })
    }

    this.player = new Tone.Player(audioURLS[3], console.log("loaded song"));
    // UNCOMMENT THIS to hear the music
    this.player.autostart = true;
    this.player.volume.value = 10;

    //Default wetnesses
    this.fx.distortion.wet.value = 0;
    this.fx.pingpong.wet.value = 0;
    this.fx.jcreverb.wet.value = 0;
    this.fx.phaser.wet.value = 0;
    this.fx.vibratoTriangle.wet.value = 0;
    this.fx.vibratoSaw.wet.value = 0;


    //Final connect to speaker
    this.fx.compressor.toMaster();

    //Effects chain
    this.fx.filter.connect(this.fx.compressor);
    this.fx.vibratoSaw.connect(this.fx.filter);
    this.fx.vibratoTriangle.connect(this.fx.vibratoSaw);
    this.fx.phaser.connect(this.fx.vibratoTriangle);
    this.fx.pitchShift.connect(this.fx.phaser);
    this.fx.pingpong.connect(this.fx.pitchShift);
    this.fx.jcreverb.connect(this.fx.pingpong);
    this.fx.tremolo.connect(this.fx.jcreverb);
    this.fx.distortion.connect(this.fx.tremolo);

    //Sound source
    this.player.connect(this.fx.distortion);
  }

  //TODO - put this functin in utils  
  soundUpdaters = {
    phaser: (x, y, w, h) => {
      const freqVal = x * (10 / w);
      const wetVal = y * (1 / h);
      this.fx.phaser.frequency.value = freqVal;
      this.fx.phaser.wet.value = wetVal;
    },

    distortion: (x, y, w, h) => {
      const val = x * (1 / w);
      const wetVal = y * (1 / h);
      this.fx.distortion.distortion = val;
      this.fx.distortion.wet.value = wetVal;
      if (val < .01) {
        this.fx.distortion.wet.value = 0;
      }
    },
    filter: (x, y, w) => {
      const frequency = x * (700 / w) + 100;
      this.fx.filter.frequency.value = frequency;
    },

    jcReverb: (x, y, w, h) => {
      const roomsizeVal = x * (1 / w);
      const wetVal = y * (1 / h);
      const jcreverb = this.fx.jcreverb;
      if (roomsizeVal < .01) {
        jcreverb.wet.value = 0;
      } else {
        jcreverb.wet.value = wetVal;
      }
      jcreverb.roomSize.value = roomsizeVal;
    },

    pingPongDelay: (x, y, w, h) => {
      const delayVal = x * (.5 / w);
      const wetVal = y * (1 / h);
      const pingpong = this.fx.pingpong;
      pingpong.delayTime.value = {
        delayTime: delayVal,
        // maxDelayTime: 5
      };
      if (delayVal < .01) {
        pingpong.wet.value = 0;
      } else {
        pingpong.wet.value = wetVal;
      }
    },

    pitchShift: (x, y, w, h) => {
      const pitchVal = x * (72 / w) - 36;
      const wetVal = y * (1 / h);
      this.fx.pitchShift.wet.value = wetVal;
      this.fx.pitchShift.pitch = pitchVal;
    },
    tremolo: (x, y, w, h) => {
      const frequencyVal = x * (30 / w);
      const wetVal = y * (1 / h);
      this.fx.tremolo.frequency.value = frequencyVal;
      this.fx.tremolo.depth.value = 1;
      this.fx.tremolo.wet.value = wetVal;
    },
    vibratoSaw: (x, y, w, h) => {
      const frequency = x * (8 / w);
      const wetVal = y * (1 / h);
      this.fx.vibratoSaw.frequency.value = frequency;
      this.fx.vibratoSaw.wet.value = wetVal;
    },
    vibratoTriangle: (x, y, w, h) => {
      const frequency = x * (10 / w);
      const wetVal = y * (.8 / h);
      this.fx.vibratoTriangle.frequency.value = frequency;
      this.fx.vibratoTriangle.wet.value = wetVal;
    },
  }

  render() {

    return (
      <div className="stage-wrapper">
        <Instrument
          socket={this.props.socket}
          performer={this.props.performer}
          isPerformer={this.props.isPerformer}
          soundUpdaters={this.soundUpdaters} />
      </div>
    );
  }
}

export default Stage;