import React from 'react';
import UpdateProfileInfo from './UpdateProfileInfo'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

render(){
    const {first, last, bio, email, showBioUpdate} = this.props

    return(
        <div className='section-wrapper'>

            <p>Hello, {first} {last}</p>
            <p>Current Bio: {bio}</p>
            <h6 id='music-bio' onClick={showBioUpdate}>Tell Us About The Music You Love ▼</h6>

        </div>
    )
}
}
