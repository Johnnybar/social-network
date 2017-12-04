import React from 'react';
import axios from 'axios'


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
            <div>
                <h1>UPLOAD PROFILE</h1>
                <input type = "file" onChange = {(e)=> this.doUpload(e)} />
                {/* <img src = { this.state.setImage }  /> */}
                {/* <button onClick={() => this.handleSubmit() }>Submit</button> */}

            </div>
        )

    }

}
