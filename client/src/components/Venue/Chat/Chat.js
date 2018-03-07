import React from "react";

const Chat = (props) => {
    return(
            <div className="panel panel-default">
                <div className="panel-heading">Audience member: {props.name}</div>
                <div className="panel-body">
                    Comment: {props.comment}
                </div>
            </div>
    );
}    
export default Chat;