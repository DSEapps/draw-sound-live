import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io();

class Chat extends Component {
    state = {
        chats: [],
        chat: "",
    }

    componentDidMount() {
        socket.on('chat msg', (msg) => {
            const chatsArray = this.state.chats.slice();
            chatsArray.splice(0, 0, msg);
            this.setState({ chats: chatsArray });
        });
    }

    handleChange = (event) => {
        this.setState({ chat: event.target.value })
    }

    handleClick = () => {
        this.setState({chat:""});
        socket.emit('chat msg', this.state.chat);
    }

    render() {

        return (
            <div className="form-group">
                <label htmlFor="chatArea" className="col-lg-2 control-label">Chat Text</label>
                <div class="col-lg-10">
                    <textarea value= {this.state.chat} onChange={this.handleChange} className="form-control" rows="1" id="chatArea"></textarea>
                </div>

                <div className="col-lg-10 col-lg-offset-2">
                    <button onClick={this.handleClick} type="submit" className="btn btn-primary">Submit</button>
                </div>

                {this.state.chats.map(chat =>
                    <div className="panel panel-default">
                        {/* <div className="panel-heading">Audience member: {props.name}</div> */}
                        <div className="panel-body">
                            {chat}
                        </div>
                    </div>
                )}

            </div>
        );
    }
}



export default Chat;