import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};

export class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
componentDidMount(){
   //  if (!onlineUsers) {
   //     return null
   // }

    // this.props.dispatch(placeOnlineUsers());
}
  render() {
      const onlineUsers= this.props.onlineUsers;
      console.log('this is online users in online.js: ', onlineUsers);
          // const onlineUsersList = onlineUsers.map(online =>
          //   <div>
                {/* <div> Online {online.first}, {online.last}</div> */}
                {/* <Link to={`/users/${pending.id}`}><img src={pending.imgurl} className='profilePicFriendsPage'/></Link> */}
                {/* <button onClick= {(e)=> this.props.dispatch(acceptFriendOnFriends(pending.id))}>Accept Friend Request</button> */}
            {/* </div> */}

        // );

        return (
            <div>
                         <div>
                             <h2>Online Users</h2>
                             {/* <ul>{onlineUsersList}</ul> */}
                         </div>

                 </div>
        )
  }
}

export default connect(mapStateToProps)(Online)
