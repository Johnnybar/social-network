import React from 'react';
import axios from 'axios';

export default class UpdateProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    updateBio(){
        axios.post('/updateBio', this.state)
        .then(resp => {
            if (resp.data.success) {
                this.props.setBio(resp.data.bio)

            } else {
                console.log('there was an error in update bio');
                this.setState({
                    error: true
                })
            }
        })
    }



    render(){
        // const {updateBio} = this.props;

        return(
            <div>
                <h5>Update Profile Information</h5>
                <textarea onChange={(e) => this.setState({bio: e.target.value}) }  name= 'bio' placeholder='bio' />
                <button onClick={e => this.updateBio(e) }>Update bio</button>
            </div>
        )
    }
}
