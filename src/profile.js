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
        <div>
            <h1>Your Profile</h1>
            <p>Hello, {first} {last}</p>
            <p>Your profile description: {bio}</p>
            <h6 onClick={showBioUpdate}>Change Your Description ▼</h6>

        </div>
    )
}
}
