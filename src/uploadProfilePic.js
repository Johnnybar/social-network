import React from 'react';
import axios from './axios';
import { Link } from 'react-router';



export default class UploadProfilePic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    doUpload(e) {
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append('file', file);
        axios.post('/upload', formData).then((resp) => {
            this.props.setImage(resp.data.imgurl)
        })
    }

    render() {
        return (
            <div id='optionsMenu'>

                <h6>Change Profile Pic <input type = "file" onChange = {(e)=> this.doUpload(e)} /></h6>
                <Link to="/friends"><h6 className='nav-item'>Friends???</h6></Link>
                <Link to= "/online"><h6 className='nav-item'>Who's Online</h6></Link>
                <Link to="/chat"><h6 className='nav-item'>Chat Room</h6></Link>
                <form action='/logOut' method='post'>
               <button id='log-out-btn' type='submit'>
                   Log Out
               </button>
               </form>

                {/* <img src = { this.state.setImage }  /> */}
                {/* <button onClick={() => this.handleSubmit() }>Submit</button> */}

            </div>
        )

    }

}
