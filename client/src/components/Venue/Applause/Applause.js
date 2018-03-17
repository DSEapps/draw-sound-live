import React, { Component } from 'react';
import VectorBoo from '../_Assets/applause-boo.svg';
import VectorClap from '../_Assets/applause-clap.svg';
import VectorMinus from '../_Assets/icon-minus.svg';
import VectorPlus from '../_Assets/icon-plus.svg';
import API from "../../../utils/API";


class Applause extends Component {
    state = {
        upClaps: 0,
        downClaps: 0
    }

    //Set up socket listeners for session claps
    componentDidMount() {
        this.props.socket.on("up", clap => {
            this.setState({ upClaps: this.state.upClaps + 1 })
        })
        this.props.socket.on("down", clap => {
            this.setState({ downClaps: this.state.downClaps + 1 })
        })
    }

    //Update performers lifetime claps before this component unmounts and performance is over
    componentWillUnmount() {
        const newUpClaps = this.state.upClaps + this.props.userInfo.upClaps;
        const newDownClaps = this.state.downClaps + this.props.userInfo.downClaps;
        if (this.props.isPerformer) {
            API.updateClaps(this.props.userInfo.id,
                { upClaps: newUpClaps, downClaps: newDownClaps }
            ).catch(err => console.log(err));;
        }
    }

    //End performance if there are more than 3 downclaps
    componentDidUpdate(prevProps) {
        if (this.state.downClaps > 3) {
            this.props.stopPerformance();
        }
    }

    handleClap = type => {
        this.props.socket.emit(type);
    }

    render() {
        let disable = null;
        this.props.isPerformer ? disable = true : disable = false;
        return (
            <div className="applause fixed-right">
                <div className="top">
                    <div className="counts"><strong>{this.state.upClaps}</strong></div>
                    <div className="plus">
                        <img src={VectorPlus} alt=" " width="14" height="14" />
                    </div>
                    <img src={VectorClap} alt="clap" disabled={disable} onClick={() => this.handleClap("up")} />
                </div>
                <div className="bottom">
                    <img src={VectorBoo} alt="boo" disabled={disable} onClick={() => this.handleClap("down")} />
                    <div className="minus">
                        <img src={VectorMinus} alt=" " width="14" height="14" />
                    </div>
                    <div className="counts"><strong>{this.state.downClaps}</strong></div>
                </div>
            </div>
        )
    }

}

export default Applause;
