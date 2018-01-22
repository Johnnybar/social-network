import React from 'react';
import UpdateProfileInfo from './updateProfileInfo'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentWillUpdate(nextProps, nextState) {

       if (this.props.showBioUpdate) {
         document.getElementsByTagName('body')[0].addEventListener('click', this.props.hideBioUpdate);
         // console.log(this.state.uploaderIsVisible);
       }

    }
render(){
    const {first, last, bio, email, showBioUpdate} = this.props

    return(
        <div className='section-wrapper'>

            <p>Hello, <span className='highlight-text'><i>{first} {last}</i></span></p>
            <p><i>Current Bio: </i>{bio}</p>
            <h5 id='music-bio' onClick={showBioUpdate}>Tell Us About The Music You Love ▼</h5>

        </div>
    )
}
}
