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

    componentDidMount() {


           var update = $('.update-bio-ui' )
           var musicBio = $("#music-bio");
           var placeholder = $(".focus-placeholder")

           placeholder.on('click', function(){
               update.toggle()
           })
           musicBio.on('click', function(e){
               update.toggle();
               e.stopPropagation()
           })
       }

    render(){


        return(

        <div className = 'update-bio-ui' >
            <div className='focus-placeholder'>
</div>
            <textarea onChange={(e) => this.setState({bio: e.target.value})} className='textarea-class' name='bio' placeholder='Info'/>
            <button className='nice-btn' onClick={e => this.updateBio(e)}>Share your taste</button>
        </div>)
    }
}
