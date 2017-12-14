import React from 'react';
import axios from './axios';

export default class UpdateProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    updateBio(){
        axios.post('/updateBio', this.state)
        .then(resp => {
            if (resp.data.success) {
                this.props.setBio(resp.data.bio);

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
            <div className='chat-ui'>

                <textarea onChange={(e) => this.setState({bio: e.target.value}) }  name= 'bio' placeholder='Info' />
                <button className= 'nice-btn' onClick={e => this.updateBio(e) }>Share your taste</button>
            </div>
        )
    }
}
