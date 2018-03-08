import React from "react";

const Chat = (props) => {
    return(
            // <div className="panel panel-default">
            //     <div className="panel-heading">Audience member: {props.name}</div>
            //     <div className="panel-body">
            //         Comment: {props.comment}
            //     </div>
            // </div>

        <div className="form-group">
            <label for="chatArea" className="col-lg-2 control-label">Chat Text</label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="3" id="chatArea"></textarea>
                </div>
      
                <div class="col-lg-10 col-lg-offset-2">
                    <button type="reset" class="btn btn-default">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
        </div>
    );
}    
export default Chat;