import React from 'react';
import axios from 'axios'


export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    }
  }

componentDidMount(){

var recipientId = this.props.recipientId;

    axios.get('/getFriendshipStatus/'+ recipientId).then(({data}) => {
        console.log('this is data results in friend button: ',data.results);
        if (data.results.length == 0) {
              this.setState({ status: "Send Friend Request"})
          }
          else {
              this.setState(data.results[0])
          }


      if (data.success){
          console.log('this is the state', this.state);
          this.setState(data.results)

      }
      else{
          this.setState({error: true});
      }
    })
}

handleSubmit(){
    var recipientId = this.props.recipientId;
    if (this.state.status == "Send Friend Request") {
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


}

  render() {

      return (
          <div>
              <button onClick= {(e)=> this.handleSubmit()}>{this.state.status}</button>
          </div>)
  }
}
