import React from "react";

const Perform = props => {
    let display = null;
    //If there is a performer and If user is a performer
    if (props.isPerformer) {
        display = 
        <div className="marquee-wrapper">
            <div className="performer-name">
                <p>{props.userInfo.name}</p>
                <p>Performer</p>
            </div>
            <div className="btn-perform">
                <button onClick={props.stopPerformance}>Leave Stage</button>
            </div>
            <div className="performer-stats">Lifetime: + {props.userInfo.upClaps}  &#124; - {props.userInfo.downClaps} </div>
        </div>
    }
    
    //If there is a performer and if user is an audience member
    else if (props.performer) {
        display =
        <div className="marquee">
            <div className="performer-name">
                <p>{props.userInfo.name}</p>
                <p>Performer</p>
            </div>
            <div className="btn-perform">&nbsp;</div>
            <div className="performer-stats">Lifetime: + {props.userInfo.upClaps}  &#124; - {props.userInfo.downClaps} </div>
        </div>
    }

    //If there is no performer
    else if (!props.performer) {
        display = 
        <div className="marquee-wrapper">
        <div className="performer-name">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </div>
        <div className="btn-perform">
            <button onClick={props.startPerformance}>Get On Stage</button>
        </div>
        <div className="performer-stats">&nbsp;</div>
    </div>
    }

    return display;

}


export default Perform;
