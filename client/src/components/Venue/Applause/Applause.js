import React, { Component } from 'react';
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
                    <div className="plus-box">
                        <svg className="indicators" x="0px" y="0px" viewBox="0 0 14 14">
                            <g>
                                <rect className="m0" />
                                <g>
                                    <line class="m1" x1="12" y1="7.1" x2="2" y2="7.1"/>
		                            <line class="m1" x1="7" y1="2.1" x2="7" y2="12.1"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <svg className="btn-voting"  x="0px" y="0px" viewBox="0 0 56 56" disabled={disable} onClick={() => this.handleClap("up")}>
                        <g>
                            <circle className="st0" cx="28" cy="28" r="27.6"/>
                            <g>
                                <path className="st1" d="M43.7,32.8c-0.6-0.6-0.8-1.4-0.6-2.1l0.6-2.4c0.4-1.5-0.1-3.1-1.2-4.3l-6.3-6.3c-0.5-0.5-1.2-0.8-1.9-0.8
                                    c-0.7,0-1.4,0.3-1.9,0.8c-0.2,0.2-0.4,0.5-0.5,0.8l-5.8-5.8c-0.5-0.5-1.2-0.8-1.9-0.8s-1.4,0.3-1.9,0.8c-0.3,0.3-0.4,0.5-0.6,0.8
                                    c-0.4-0.2-0.9-0.4-1.3-0.4c-0.7,0-1.4,0.3-1.9,0.8c-0.9,0.9-1,2.2-0.4,3.2c-0.3,0.1-0.6,0.3-0.8,0.6c-0.3,0.3-0.4,0.5-0.6,0.8
                                    c-1-0.6-2.4-0.4-3.2,0.4c-1,1-1,2.8,0,3.8l0.1,0.1c-0.3,0.1-0.5,0.3-0.8,0.5c-1,1-1,2.8,0,3.8l0.8,0.8c-0.3,0.1-0.5,0.3-0.8,0.5
                                    c-1,1-1,2.8,0,3.8l5.5,5.5c4,4.1,9.4,6.3,15.1,6.3c0.3,0,0.5-0.1,0.6-0.3l4.6-4.6l0,0l5-5C44,34,44,33.8,44,33.6s-0.1-0.5-0.3-0.6
                                    L43.7,32.8z M36.9,32.9l-0.6,2.4c-0.3,1.1-0.1,2.3,0.6,3.3l-3.7,3.8c-5.1-0.1-9.9-2.1-13.5-5.8L14.1,31c-0.2-0.2-0.3-0.4-0.3-0.6
                                    c0-0.3,0.1-0.5,0.3-0.6c0.1-0.2,0.4-0.3,0.6-0.3c0.3,0,0.5,0.1,0.6,0.3l4.4,4.4c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-7-7
                                    c-0.4-0.4-0.4-0.9,0-1.3c0.4-0.3,0.9-0.4,1.3,0l6.9,6.9c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-8.8-8.9
                                    c-0.4-0.4-0.4-0.9,0-1.3c0.4-0.4,0.9-0.4,1.3,0l8.8,8.8c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-7.5-7.6
                                    c-0.4-0.4-0.4-0.9,0-1.3c0.3-0.3,0.9-0.3,1.3,0l7.6,7.6l0,0l3.8,3.8c0.4,0.4,0.9,0.4,1.3,0c0.2-0.2,0.3-0.4,0.3-0.6
                                    c0-0.3-0.1-0.5-0.3-0.6l-3.8-3.8c-0.4-0.4-0.4-0.9,0-1.3c0.4-0.4,0.9-0.4,1.3,0l6.3,6.3C36.9,31,37.2,32,36.9,32.9z M42,27.9
                                    l-0.6,2.4c-0.3,1.1-0.1,2.3,0.6,3.3l-3.8,3.8c-0.2-0.5-0.3-1-0.1-1.5l0.6-2.4c0.4-1.5-0.1-3.1-1.2-4.3l-6.3-6.3c-1-1-2.8-1-3.8,0
                                    c-0.2,0.2-0.4,0.5-0.5,0.8l-5.8-5.8l0,0l-1.3-1.3c-0.4-0.4-0.4-0.9,0-1.3c0.4-0.4,0.9-0.4,1.3,0l1.1,1.1c0,0,0.1,0.1,0.1,0.1
                                    l4.1,4.1c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-4.2-4.2c-0.1-0.1-0.2-0.4-0.2-0.6c0-0.3,0.1-0.5,0.3-0.6
                                    c0.3-0.3,0.9-0.3,1.3,0l7.6,7.6l0,0l3.8,3.8c0.4,0.4,0.9,0.4,1.3,0c0.2-0.2,0.3-0.4,0.3-0.6c0-0.3-0.1-0.5-0.3-0.6l-3.8-3.8
                                    c-0.4-0.4-0.4-0.9,0-1.3c0.4-0.4,0.9-0.4,1.3,0l6.3,6.3C41.9,26,42.2,27,42,27.9z"/>
                                <path className="st1" d="M36.9,16.4c1.5,0,2.7,1.2,2.7,2.7c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9c0-2.5-2-4.5-4.5-4.5
                                    c-0.5,0-0.9,0.4-0.9,0.9C36,16,36.4,16.4,36.9,16.4z"/>
                                <path className="st1" d="M38.7,11.9c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9c2,0,3.6,1.6,3.6,3.6c0,0.5,0.4,0.9,0.9,0.9
                                    c0.5,0,0.9-0.4,0.9-0.9C44.1,14.3,41.7,11.9,38.7,11.9z"/>
                                <path className="st1" d="M19.1,39.6c-1.5,0-2.7-1.2-2.7-2.7c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,2.5,2,4.5,4.5,4.5
                                    c0.5,0,0.9-0.4,0.9-0.9S19.6,39.6,19.1,39.6z"/>
                                <path className="st1" d="M17.3,42.3c-2,0-3.6-1.6-3.6-3.6c0-0.5-0.4-0.9-0.9-0.9s-0.9,0.4-0.9,0.9c0,3,2.4,5.4,5.4,5.4
                                    c0.5,0,0.9-0.4,0.9-0.9C18.2,42.7,17.8,42.3,17.3,42.3z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="bottom">
                    <svg className="btn-voting"  x="0px" y="0px" viewBox="0 0 56 56" disabled={disable} onClick={() => this.handleClap("down")}>
                        <g>
                            <circle className="st0" cx="28" cy="28" r="27.6"/>
                            <g>
                                <g>
                                    <path className="st1" d="M39.3,42.4c-1.5,0-2.9-0.7-3.8-1.8c-0.9,1.1-2.2,1.8-3.8,1.8s-2.9-0.7-3.8-1.8c-0.9,1.1-2.2,1.8-3.8,1.8
                                        s-2.9-0.7-3.8-1.8c-0.9,1.1-2.2,1.8-3.8,1.8c-2.6,0-4.8-2.1-4.8-4.8V25.6c0-8.8,7.2-16,16-16s16,7.2,16,16v12.1
                                        C44,40.3,41.9,42.4,39.3,42.4z M35.5,36.7c0.6,0,1,0.4,1,1c0,1.5,1.2,2.8,2.8,2.8s2.8-1.2,2.8-2.8V25.6c0-7.7-6.3-14-14-14
                                        s-14,6.3-14,14v12.1c0,1.5,1.2,2.8,2.8,2.8s2.8-1.2,2.8-2.8c0-0.6,0.4-1,1-1s1,0.4,1,1c0,1.5,1.2,2.8,2.8,2.8
                                        c1.5,0,2.8-1.2,2.8-2.8c0-0.6,0.4-1,1-1s1,0.4,1,1c0,1.5,1.2,2.8,2.8,2.8c1.5,0,2.8-1.2,2.8-2.8C34.5,37.1,35,36.7,35.5,36.7z"/>
                                </g>
                                <g>
                                    <path className="st1" d="M21.8,28.3c-1.9,0-3.4-1.5-3.4-3.4c0-0.6,0.4-1,1-1s1,0.4,1,1c0,0.7,0.6,1.4,1.4,1.4c0.7,0,1.4-0.6,1.4-1.4
                                        c0-0.6,0.4-1,1-1s1,0.4,1,1C25.2,26.8,23.7,28.3,21.8,28.3z"/>
                                </g>
                                <g>
                                    <path className="st1" d="M34.2,28.3c-1.9,0-3.4-1.5-3.4-3.4c0-0.6,0.4-1,1-1s1,0.4,1,1c0,0.7,0.6,1.4,1.4,1.4c0.7,0,1.4-0.6,1.4-1.4
                                        c0-0.6,0.4-1,1-1s1,0.4,1,1C37.5,26.8,36,28.3,34.2,28.3z"/>
                                </g>
                                <g>
                                    <path className="st1" d="M28.2,35.3c-1.9,0-3.4-1.5-3.4-3.4s1.5-3.4,3.4-3.4s3.4,1.5,3.4,3.4S30,35.3,28.2,35.3z M28.2,30.5
                                        c-0.7,0-1.4,0.6-1.4,1.4c0,0.7,0.6,1.4,1.4,1.4c0.7,0,1.4-0.6,1.4-1.4C29.5,31.2,28.9,30.5,28.2,30.5z"/>
                                </g>
                            </g>
                        </g>
                    </svg>
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
