import React from "react";

const Perform = props => {
    let display = null;
    //If there is a performer and If user is a performer
    if (props.isPerformer) {
        display = 
        <div className="marquee-wrapper">
            <div className="performer-name">
                <div>{props.userInfo.name}</div>
                <div><strong>Performer</strong></div>
            </div>
            <div className="btn-perform">
                <button onClick={props.stopPerformance}>Leave Stage</button>
            </div>
            <div className="performer-stats"><span className="aa">Lifetime:</span> + <span className="ba"> {props.userInfo.upClaps}</span>  <span className="ca">&#124;</span> <span className="bb">{props.userInfo.downClaps}</span> - </div>
        </div>
    }
    
    //If there is a performer and if user is an audience member
    else if (props.performer) {  
        display =
        <div className="marquee-wrapper">
            <div className="performer-name">
                <div>{props.performer.name}</div>
                <div><strong>Performer</strong></div>
            </div>
            <div className="btn-perform">&nbsp;</div>
            <div className="performer-stats"><span className="aa">Lifetime:</span> + <span className="ba"> {props.userInfo.upClaps}</span>  <span className="ca">&#124;</span> <span className="bb">{props.userInfo.downClaps}</span> - </div>
        </div>
    }

    //If there is no performer
    else if (!props.performer) {
        display = 
        <div className="marquee-wrapper">
            <div className="performer-name">

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
