import React from 'react';
import axios from './axios';
import FriendButton from './friendbutton';
import { Link } from 'react-router';



export default class OtheUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


componentDidMount() {
  let id = this.props.params.id
  axios.get('/otherUsersJson?id='+id).then(({data}) => {
    this.setState(data.data, function(){

    });
})
//RUN A CHECK BEFORE RUNNING THIS TO SEE IF USER VIEWED IS A FRIEND
  axios.get('/getOtherUsersFriends/'+id).then((result)=>{
      console.log('this is result: ', result);
     if(result.data.success == false){
         console.log('this was null');
     }
     else{
         this.setState({
             friends: result.data});
     }

  })
}

  render() {
      let otherUserFriendList = 'You cannot see my friends unless we become friends'
      const {sendFriendRequest} = this.props
      if(this.state.friends){
       otherUserFriendList = this.state.friends.map(friend =>
     <div>
        <h6>{friend.first}, {friend.last}</h6>
        <a href={`/users/${friend.id}`}><img src={friend.imgurl} className='profilePicFriendsPage'/></a>
    </div>
    );
}

return (<div className='section-wrapper'>
<h2>{this.state.first}</h2>
<h3>{this.state.bio}</h3>
<img src={this.state.imgurl} id='otherUsersImg'/>
<FriendButton recipientId={this.props.params.id} sendFriendRequest={sendFriendRequest}/>
<h5>These are some other friends of mine: </h5>
<ul id='friend-recommendations'>{otherUserFriendList}</ul>



</div>)
  }
}
