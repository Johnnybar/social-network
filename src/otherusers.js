import React from 'react';
import axios from 'axios';
import FriendButton from './friendbutton'



export default class OtheUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


componentDidMount() {
  let id = this.props.params.id
  axios.get('/otherUsersJson?id='+id).then(({data}) => {
    this.setState(data.data, function(){

    });//setting the keys and values we received from data to the state object
  })
}

  render() {
const {sendFriendRequest} = this.props
return (<div>
<h2>{this.state.first}</h2>
<h3>{this.state.bio}</h3>
<img src={this.state.imgurl} id='otherUsersImg'/>
<FriendButton recipientId={this.props.params.id} sendFriendRequest={sendFriendRequest}/>
</div>)
  }
}
