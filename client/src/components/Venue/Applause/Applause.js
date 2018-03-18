import React, { Component } from 'react';
import './assets/css/applause.css';
import Clap from './assets/images/imgClap.svg';
import Boo from './assets/images/imgBoo.svg';
import API from "../../../utils/API";


class Applause extends Component {
    state = {
        upClaps: 0,
        downClaps: 0
    }

    //Set up socket listeners for session claps
    componentDidMount() {
        this.props.socket.on("up", clap => {
            //check to make sure not setting state on unmounted component
            if (this.refs.applause) {
            this.setState({ upClaps: this.state.upClaps + 1 })
            }
        })
        this.props.socket.on("down", clap => {
            //check to make sure not setting state on unmounted component
            if (this.refs.applause) {
            this.setState({ downClaps: this.state.downClaps + 1 })
            }
        })
    }

    //Update performers lifetime claps before this component unmounts and performance is over
    componentWillUnmount() {
        const newUpClaps = this.state.upClaps + this.props.userInfo.upClaps;
        const newDownClaps = this.state.downClaps + this.props.userInfo.downClaps;
        if (this.props.isPerformer) {
            API.updateClaps(this.props.userInfo.id,
                { upClaps: newUpClaps, downClaps: newDownClaps }
            ).then(newData=>{  
                this.props.updateClaps(newData.data);
            }).catch(err => console.log(err));;
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
            <div ref="applause" className="applause fixed-right">
                <div className="top">
                    <div className="counts"><strong>{this.state.upClaps}</strong></div>
                    <div className="plus-box">
                        <svg className="indicators" x="0px" y="0px" viewBox="0 0 14 14">
                            <g>
                                <rect className="m0" />
                                <g>
                                    <line className="m1" x1="12" y1="7.1" x2="2" y2="7.1"/>
		                            <line className="m1" x1="7" y1="2.1" x2="7" y2="12.1"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <button className="unstyle" disabled={disable} onClick={() => this.handleClap("up")} >
                        <img src={Clap} width="56" height="56"/>
                    </button>
                </div>
                <div className="bottom">
                    <button className="unstyle" disabled={disable} onClick={() => this.handleClap("down")} >
                        <img src={Boo} width="56" height="56"/>
                    </button>
                    <div className="minus-box">
                        <svg className="indicators" x="0px" y="0px" viewBox="0 0 14 14">
                            <g>
                                <rect className="m0" />
                                <g>
                                    <line className="m1" x1="12" y1="7.1" x2="2" y2="7.1"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="counts"><strong>{this.state.downClaps}</strong></div>
                </div>
            </div>
        )
    }

}

export default Applause;
