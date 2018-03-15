import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    state = {
        chats: [],
        chat: "",
        expanded: false
    }

    componentDidMount() {
        this.props.socket.on('chat msg', (msg) => {
            const chatsArray = this.state.chats.slice();
            chatsArray.splice(0, 0, msg);
            this.setState({ chats: chatsArray });
        });
    }

    toggleChat = () => {
        if (this.state.expanded === true) {
            this.setState({ expanded: false })
        } else {
            this.setState({ expanded: true })
        }
    }

    handleChange = (event) => {
        this.setState({ chat: event.target.value })
    }

    handleClick = () => {
        this.setState({ chat: "" });
        this.props.socket.emit('chat msg', this.state.chat);
    }

    render() {
        return (
            <div className="form-group">
                {this.state.chats.map(chat =>
                    <div style={this.state.expanded ? { display: 'block' } : { display: 'none' }} className="chat-data">
                        {/* <div className="panel-heading">Audience member: {props.name}</div> */}
                        <div className="panel-body">
                            {this.props.userInfo.name}{": " + chat}
                        </div>
                    </div>
                )}
                <button  className="chat-toggle" onClick={this.toggleChat}>&#8593;</button>
                <div className="chat-panel">
                    <textarea value={this.state.chat} onChange={this.handleChange} className="form-control" rows="1" col="5" id="chatArea"></textarea>
                </div>
                <div className="btn-chat">
                    <button onClick={this.handleClick} type="submit" className="btn btn-primary">Chat</button>
                </div>
            </div>
        );
    }
}



export default Chat;