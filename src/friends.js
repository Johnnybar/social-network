import React from 'react';
import {connect} from 'react-redux';
import axios from './axios';
import {allFriendRequests} from './actions';
import {acceptFriendOnFriends} from './actions';
import {terminateFriendOnFriends} from './actions'
import {Link} from 'react-router';

const mapStateToProps = function(state) {
  return {
    pendingFriends: state.friends && state.friends.filter(friends => friends.status == "Cancel Friend Request"),
    acceptedFriends: state.friends && state.friends.filter(friends => friends.status == "Terminate Friendship" || friends.status == 'Accept Friend Request')
  }
};

const mapDispatchToProps = function(state) {
  return {};
};

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {

    this.props.dispatch(allFriendRequests());
  }
  render() {
    const arr = ["https://cdn.pixabay.com/photo/2016/03/31/23/37/monster-1297726_960_720.png","https://orig00.deviantart.net/6cab/f/2014/114/9/2/monstruo_vector_move_3_by_alba_r_luque-d7frqes.gif","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkWU36GHqTAy8sA-FsMWTInoz6WfMTo2g-UKbRFFgX6XbuC-5","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW7sCc3l0dlFO9ywORyVtZ-wwSLsTK_1WPEr92HdAKW6_Itfd1","https://cdn.pixabay.com/photo/2016/03/22/17/28/transparent-background-1273346_960_720.png","https://farm6.staticflickr.com/5303/5687100580_3e66d28f07_b.jpg","https://cdn.pixabay.com/photo/2015/09/22/08/10/monster-951232_960_720.png","https://cdn.pixabay.com/photo/2016/03/31/20/16/alien-1295644_960_720.png","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILwAQkyJepN6A1v65oN9V2FBfCzlP3U1kHlWIE5Iw4tjLVvND2g","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRIoDJcijiD0AX35hdJN-r3hyXj11Qje3RzydXLdSDIqhpsck"]
    const pendingFriends = this.props.pendingFriends;
    const acceptedFriends = this.props.acceptedFriends
    if (!pendingFriends) {
      return null
    }
    for (var i = 0; i < pendingFriends.length; i++) {
      pendingFriends[i].imgurl = arr[i]
    }
    const pendingFriendsList = pendingFriends.map(pending => <div>
      <div>
        {pending.first}, {pending.last}</div>
      <Link to={`/users/${pending.id}`}><img src=
      {pending.imgurl}
      // "https://picsum.photos/200"
      className='profilePicFriendsPage'/></Link>
      <button className='nice-btn' onClick ={(e)=> this.props.dispatch(acceptFriendOnFriends(pending.id))}>Accept Friend Request</button>
    </div>);
    for (var i = 0; i < acceptedFriends.length; i++) {
      acceptedFriends[i].imgurl = "https://picsum.photos/200"
    }
    for (var i = 0; i < acceptedFriends.length; i++) {
      acceptedFriends[i].imgurl = arr[i+3]
    }
    const acceptedFriendsList = acceptedFriends.map(accepted => <div >
      <div>
        {accepted.first}, {accepted.last}
      </div>
      <Link to={`/users/${accepted.id}`}>
      <img src=
      // "https://picsum.photos/200"
      {accepted.imgurl}
       className='profilePicFriendsPage'/></Link>
      <button className='nice-btn' onClick= {(e)=> this.props.dispatch(terminateFriendOnFriends(accepted.id))}>End Friendship</button>
    </div>);

    return (<div className='friends-wrapper clickObj'>
      <div className='perspective-friend-box'>
        <div className='friend-box'>
          <h2>Pending Friends</h2>
          <ul >{pendingFriendsList}</ul>
        </div>
      </div>
      <div className='perspective-friend-box'>
        <div className='friend-box'>
          <h2>Accepted Friends</h2>
          <ul >{acceptedFriendsList}</ul>
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(Friends)
