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
                this.setState({
                    error: true
                })
            }
        })
    }



    render(){


        return(

        <div className = 'update-bio-ui' >

            <textarea onChange={(e) => this.setState({bio: e.target.value})} className='textarea-class' name='bio' placeholder='Info'/>
            <button className='nice-btn' onClick={e => this.updateBio(e)}>Share your taste</button>
        </div>)
    }
}
