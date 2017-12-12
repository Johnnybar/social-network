import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import socketConnections from './socket'


const mapStateToProps = function(state) {
    return {
        messagesArr:state.messagesArr && state.messagesArr
    };
};


export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     handleSubmit(e){
        var text = this.state.text
        console.log('in handleSubmit', text);
        socketConnections().emit('chat', (text));

    }
    componentDidMount(){

    }

    render() {
        if(this.props.messagesArr){

            const messages= this.props.messagesArr
            console.log('this is props messagesArr: ', messages);
            if (this.props.messagesArr){
            var messagesList = messages.map(message =>
                <div>
                    <h6>{message.messageWithUser.first}, {message.messageWithUser.last}</h6>
                    <img src={message.messageWithUser.imgurl} className='profilePicFriendsPage'/>
                <br></br>
                    <h4> Says: {message.messageWithUser.text}</h4>
                </div>
                //
            );
        }
    }
            else{
                return null
            }


        return (
            <div>
                <h4>This is Chat</h4>
                 <ul>{messagesList}</ul>
                <textarea onChange={(e) => this.setState({text: e.target.value})}></textarea>
                    <button
                        onClick= {this.handleSubmit}
                        >Send Message</button>
                </div>

        )
    }
}

export default connect(mapStateToProps)(Chat);
