import React from "react";

const Audience = (props) => {
    return (
    <div>
        <h3>This is the number of connected users: {props.clientsCount}</h3>
    </div>        
    );
}; 


export default Audience;
