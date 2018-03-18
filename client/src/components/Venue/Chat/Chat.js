import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    state = {
        chats: [],
        chat: "",
        expanded: false,
        toggleAffordance: "\u25B2"
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
            this.setState({ expanded: false, toggleAffordance: "\u25B2" })
        } else {
            this.setState({ expanded: true , toggleAffordance: "\u25BC"})
        }
    }

    handleChange = (event) => {
        this.setState({ chat: event.target.value })
    }

    handleClick = () => {
        this.setState({ chat: "" });
        this.props.socket.emit('chat msg', this.state.chat);
    }
    
    handleEnter = (event) => {
        if (event.keyCode === 13) {
        this.setState({ chat: "" });
        this.props.socket.emit('chat msg', this.state.chat);
        }
    }

    

    render() {
        const chatName = {
            fontSize: '11px',
            fontEeight: '600',
            letterSpacing: '.1rem',
            textTransform: 'uppercase'
          };

        return (
            <div className="chat fixed-bottom">
                {this.state.chats.map(chat =>
                    <div className="chat-data" style={this.state.expanded ? { display: 'block' } : { display: 'none' }} >
                        <div className="chat-body">
                            <span style={chatName}>{this.props.userInfo.name}</span>{": " + chat}
                        </div>
                    </div>
                )}
                <div className="chat-panel">
                    <div className="chat-toggler" onClick={this.toggleChat}>&nbsp;{this.state.toggleAffordance}&nbsp;</div>
                    <input type="text" value={this.state.chat} placeholder="say something..." onChange={this.handleChange} onKeyUp={this.handleEnter} ></input>
                    <div className="chat-submitter" onClick={this.handleClick}><strong>Speak</strong></div>
                </div>
            </div>
        );
    }
}



export default Chat;
