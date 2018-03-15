import React from "react";


const Marquee = (props) => {
    return(
        <div className="marquee">
            <div className="perfomer-name">
                <p>{props.name}</p>
                <p>Performing</p>
            </div>
            <div className="perfomer-lifetimes">
                <p>Lifetime: </p>
                <p>+ {props.upClaps}</p>
                <p> &#124; </p>
                <p>- {props.downClaps}</p>
            </div>
      </div>
    );
}    
export default Marquee;
