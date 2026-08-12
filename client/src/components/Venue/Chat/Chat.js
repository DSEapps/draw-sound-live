import React, { Component } from 'react';

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
            chatsArray.push(msg);
            this.setState({ chats: chatsArray });
        });
    }

    toggleChat = () => {
        if (this.state.expanded === true) {
            this.setState({ expanded: false, toggleAffordance: "\u25B2" })
        } else {
            this.setState({ expanded: true, toggleAffordance: "\u25BC" })
        }
    }

    handleChange = (event) => {
        this.setState({ chat: event.target.value })
    }

    emitChat = () => {
        const name = this.props.userInfo.name.toUpperCase();
        this.setState({ chat: "" });
        this.props.socket.emit('chat msg', name + ": " + this.state.chat);
    }

    handleClick = () => {
        this.emitChat();
    }

    handleEnter = (event) => {
        if (event.keyCode === 13) {
            this.emitChat();
        }
    }

    render() {
        return (
            <div className="chat fixed-bottom">
                {this.state.chats.map(chat =>
                    <div className="chat-data" style={this.state.expanded ? { display: 'block' } : { display: 'none' }} >
                        <div className="chat-body">{chat}</div>
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
