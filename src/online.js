import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const mapStateToProps = function(state) {
  return {onlineUsers: state.onlineUsers};
};

export class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  render() {
    const onlineUsers = this.props.onlineUsers;
    if (!onlineUsers) {
      return null
    }

    const onlineUsersList = onlineUsers.map(online =>
    <div>
      <div>
        {online.first}, {online.last}</div>
      <Link to={`/users/${online.id}`}><img src={online.imgurl} className='profilePicFriendsPage'/></Link>
    </div>);
    
    return (<div className='section-wrapper clickObj'>
      <div>
        <h2>Online Users</h2>
        <ul>{onlineUsersList}</ul>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(Online)
