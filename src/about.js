import React from 'react';
import {Link} from 'react-router';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (<div className='section-wrapper clickObj'>
      <h2>
      Sick of endless mixes and songs tailored for you by a soulless, mechanical machine?
      </h2>
      <h4>
        <span className='highlight-text'>Track#Share</span>
        &nbsp;is here for you.<br/><br/>
        Connect with friends who share your musical taste, rejoice in the chat room and get fresh,
        <br/>ever-changing tracks from your taste buddies.</h4>
    </div>)
  }
}
