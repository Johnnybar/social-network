import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = function(state) {
  return {};
};

export default class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgurl: '',
      first: '',
      last: ''
    }
  }

  render() {
    if (this.props.id) {
      var id = this.props.id;
    }
    return (<div className='appHeaderWrapper'>
      <img src='/vertical.svg' onClick={this.props.showUploader} id='hamburger-menu'/>
      <Link to='/'><img src={this.props.imgurl} id='profilePic' alt={this.props.first}/></Link>
      <Link id='about-link' to='/about'>About
        <br/>Track#Share</Link>
    </div>)
  }
}
