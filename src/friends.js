import React from 'react';
import { connect } from 'react-redux';
import axios from './axios';
import {allFriendRequests} from './actions';
import {acceptFriendOnFriends} from './actions';
import {terminateFriendOnFriends} from './actions'
import { Link } from 'react-router';


const mapStateToProps = function(state) {
    return {
        pendingFriends: state.friends && state.friends.filter(friends => friends.status == "Cancel Friend Request"),
        acceptedFriends: state.friends && state.friends.filter(friends => friends.status == "Terminate Friendship"
        || friends.status =='Accept Friend Request'),

    }
};

const mapDispatchToProps = function(state) {
    return {
    };
};

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
componentDidMount(){

    this.props.dispatch(allFriendRequests());
}
  render() {
      const pendingFriends= this.props.pendingFriends;
      const acceptedFriends = this.props.acceptedFriends
      if(!pendingFriends){
          return null
      }
          const pendingFriendsList = pendingFriends.map(pending =>
            <div>
                <div> {pending.first}, {pending.last}</div>
                <Link to={`/users/${pending.id}`}><img src={pending.imgurl} className='profilePicFriendsPage'/></Link>
                <button onClick= {(e)=> this.props.dispatch(acceptFriendOnFriends(pending.id))}>Accept Friend Request</button>
            </div>

        );
            const acceptedFriendsList = acceptedFriends.map(accepted =>
                <div>
                    <div> {accepted.first}, {accepted.last} </div>
                    <Link to={`/users/${accepted.id}`}><img src={accepted.imgurl} className='profilePicFriendsPage'/></Link>
                    <button onClick= {(e)=> this.props.dispatch(terminateFriendOnFriends(accepted.id))}>End Friendship</button>
                </div>

            );

        return (
            <div className='friends-wrapper'>
                         <div>
                             <h2>Pending Friends</h2>
                             <ul>{pendingFriendsList}</ul>
                         </div>

                         <div>
                             <h2>Accepted Friends</h2>
                             <ul>{acceptedFriendsList}</ul>
                         </div>
                 </div>
        )
  }
}

export default connect(mapStateToProps)(Friends)
