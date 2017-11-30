import React from 'react';

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            first: '',
            last: '',
            showUploader: function(){
                console.log('uploader should be here!');
            }
        }
}
        render(){
            return(
                <h2>Profile Pic</h2>
            )
        }
}
