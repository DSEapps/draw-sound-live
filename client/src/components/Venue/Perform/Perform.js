import React from "react";

const Perform = props => {
    let display = null;
    //If user is a performer, stop button shows
    if (props.isPerformer) {
        display = <button onClick={props.stopPerformance}>Get off stage</button>
    }
    
    //If someone is performing, button is disabled
    else if (props.performer) {
        display = <div className="marquee">
            <div>Name: {props.userInfo.name}</div>
            <div>Lifetime upclaps: {props.userInfo.upClaps}</div>
            <div>Lifetime downclaps: {props.userInfo.downClaps}</div>
        </div>
    }

    //If nobody is performing, start button shows
    else if (!props.performer) {
        display = <button onClick={props.startPerformance}>Get on stage</button>
    }

    return display;

}


export default Perform;
