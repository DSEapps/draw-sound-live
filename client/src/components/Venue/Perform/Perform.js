import React from "react";

const Perform = props => {
    let button = null;
    //If user is a performer, stop button shows
    if (props.isPerformer) {
        button = <button onClick={props.stopPerformance}>Get off stage</button>
    } 
    //If someone is performing, button is disabled
    else if (props.performer) {
        button = <button disabled="true">Disabled</button>
    } 
    //If nobody is performing, start button shows
    else if (!props.performer) {
        button = <button onClick={props.startPerformance}>Get on stage</button>
    }

    return button;

}


export default Perform;
