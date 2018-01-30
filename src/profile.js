import React from 'react';
import UpdateProfileInfo from './updateProfileInfo'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentWillUpdate(nextProps, nextState) {

//Clicking middle of screen closes bio update window
       if (this.props.showBioUpdate) {
         document.getElementsByClassName('clickObj')[0].addEventListener('click', this.props.hideBioUpdate);
       }

    }
render(){
    const {first, last, bio, email, showBioUpdate} = this.props

    return(
        <div>
        <div className='section-wrapper clickObj'>
            <p>Hello, <span className='highlight-text'><i>{first} {last}</i></span></p>
            
            <p><i>Current Bio: </i>{bio}</p>

        </div>
        <h5 id='music-bio' onClick={showBioUpdate}>Tell Us About The Music You Love ▼</h5>
        </div>
    )
}
}
