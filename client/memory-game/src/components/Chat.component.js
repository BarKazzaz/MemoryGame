import React, { Component } from "react";

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.msg || '',
            messages: [],
            parrentHandler: props.parrentHandler
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.msg.from === 'me') {
            if ((prevProps.msg.from !== 'me') || prevProps.msg.content !== this.props.msg.content) {
                this.addMessage('me', this.props.msg.content);
            }
        } else if ((prevProps.msg.from === 'me') || prevProps.msg.content !== this.props.msg.content) {
            this.addMessage('fromOther', this.props.msg.content);
        }
    }

    componentDidMount() {
        document.getElementById('chat_msg_input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                this.newMessageHandler(e)
        })
    }

    addMessage(from, content) {
        if (!content) return;
        let side;
        if (from === 'me') side = 'left';
        else side = 'darker right';
        let msg = <div className="chat_container"><div className={`msg_container ${side}`}><p>{content}</p><span className="time-right">11:00</span></div></div>
        this.state.messages.push(msg);
        this.forceUpdate();
    }

    newMessageHandler(event) {
        this.state.parrentHandler(document.getElementById('chat_msg_input').value);
        document.getElementById('chat_msg_input').value = '';
    }


    render() {
        let board = document.getElementById("chat_board");
        if (board)
            board.scrollTop = board.scrollHeight;
        return (
            <div id='chat_box'>
                <div id='chat_board'>
                    {this.state.messages}
                </div>
                <input id='chat_msg_input' type='text' />
                <input type='submit' onClick={this.newMessageHandler.bind(this)}></input>
            </div>
        )
    }
}