import React from "react";

const Marquee = (props) => {
    return(
        <div className="well well-lg">
        <h1>This is the Marquee</h1>
        <p>Current Performer: {props.name}</p>
        <p>Performance Number: {props.perf}</p>
        <p>Last Performance: {props.last}</p>
        <p>Lifetime Claps: {props.claps}</p>
      </div>
    );
}    
export default Marquee;
