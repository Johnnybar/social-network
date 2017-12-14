import React from 'react';
import axios from './axios'
import socketConnections from './socket'
import {store} from './start';
import {alertOnFriendRequest} from './actions'


export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

componentDidMount(){
var recipientId = this.props.recipientId;
    axios.get('/getFriendshipStatus/'+ recipientId).then(({data}) => {
      if (data.success){
          if (data.results.length == 0) {
              this.setState({ status: "Send Friend Request"})
          }
          else {
              this.setState(data.results)
          };
      }
      else{
          this.setState({error: true});
      }
    })

}

handleSubmit(){
    var recipientId = this.props.recipientId;
    if (this.state.status == "Send Friend Request") {
        //EMIT notification with recipient id here

        // socketConnections().emit('friendRequestSent', recipientId);

           this.state.status = "Cancel Friend Request";
           axios.post('/changeFriendshipStatus/' + recipientId, this.state)
           .then((resp)=>{
               if (resp.data.success){
                   this.setState(this.state)
               }
               else {
                   this.setState({ error: true })
               }
           })
       } else if (this.state.status == "Cancel Friend Request") {
           this.state.status = "Send Friend Request";
           this.setState(this.state)
           axios.post('/deleteFriendRequest/'+recipientId, recipientId)
       }
       else if (this.state.status == 'Accept Friend Request'){
            this.state.status = "Terminate Friendship";
           axios.post('/acceptFriendRequest/'+ recipientId, this.state).then(resp=>{
               if (resp.data.success){
                   this.setState({status: "Terminate Friendship"});
               }
               else{
                   this.setState({error: true})
               }
           })
       }
       else if (this.state.status == "Terminate Friendship"){
           console.log('This is a user we did not request yet');
            this.state.status = "Send Friend Request";
           axios.post('/deleteFriendRequest/'+recipientId, recipientId).then(resp=>{
               if (resp.data.success){
                   this.setState({status: "Send Friend Request"});
               }
               else{
                   this.setState({error: true})
               }
           })
       }


}

  render() {

      return (
          <div>
              <button onClick= {(e)=> this.handleSubmit()}>{this.state.status}</button>
          </div>)
  }
}
