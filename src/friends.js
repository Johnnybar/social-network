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
    const pendingFriends = this.props.pendingFriends;
    const acceptedFriends = this.props.acceptedFriends
    if (!pendingFriends) {
      return null
    }
    for (var i = 0; i < pendingFriends.length; i++) {
      pendingFriends[i].imgurl = "https://picsum.photos/200"
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
