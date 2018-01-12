import React from 'react';
import axios from './axios';

export default class UpdateProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        // this.collapse = this.collapse.bind(this)
    }

    // collapse(){
    //     console.log(this.state);
    //     this.setState({bioUpdateIsVisible: false});
    //     console.log(this.state);
    // };
    updateBio(){
        axios.post('/updateBio', this.state)
        .then(resp => {
            if (resp.data.success) {
                this.props.setBio(resp.data.bio);
            } else {
                // console.log('there was an error in update bio');
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
            update.toggle(300)
        })
        musicBio.on('click', function(e){
            update.toggle(300);
            e.stopPropagation()
        })
    }

    render(){


        return(

            <div className='update-bio-ui' >
                <div className='focus-placeholder'>
                </div>
                <textarea onChange={(e) => this.setState({bio: e.target.value}) } className='textarea-class' name= 'bio' placeholder='Info' />
                <button className= 'nice-btn' onClick={e => this.updateBio(e) }>Share your taste</button>
            </div>
        )
    }
}
