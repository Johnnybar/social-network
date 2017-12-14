import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import socketConnections from './socket'

const mapStateToProps = function(state) {
    return {
        messagesArr: state.messagesArr && state.messagesArr
    };
};

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        var text = this.state.text
        socketConnections().emit('chat', (text));
        var textarea = document.getElementById('textarea')
        textarea.value =''


    }

    componentDidMount() {}

    render() {
        if (this.props.messagesArr) {
            const messages = this.props.messagesArr;
            var messagesList = messages.map(message => {
                let url = `${message.text}`;
                return <div className='chat-record'>
                    <h6>{message.first}, {message.last}</h6>
                    <img src={message.imgurl} className='profilePicFriendsPage'/>
                    <br></br>
                    <h6>Recommends # <span className='highlight-green'>{message.text}</span></h6>
                        <a className='font-white' href={url}><div className= 'triangle'></div></a>
                </div>
                //
            });
        } else {
            return null
        }

        return (<div className='section-wrapper'>
            <h4 className='font-white chat-description-box'>Welcome to chat. Listening to something soooo good?<br></br> Paste a link and get your friends in the mood</h4>
            <div className='chat-ui'>

                <ul>{messagesList}</ul>

                <textarea id='textarea' value={this.state.value} placeholder='Paste link' onChange={(e) => this.setState({text: e.target.value})}></textarea>
                <button className='nice-btn' onClick={this.handleSubmit}>Send Track</button>

        </div>

        </div>)
    }
}

export default connect(mapStateToProps)(Chat);
