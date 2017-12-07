import React from 'react';
import { Link } from 'react-router';

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgurl:'',
            first: '',
            last: '',
            // showUploader: function(){
            //     console.log('uploader should be here!');
            // }
        }
}

        render(){
            return(
                <div class='appHeaderWrapper'>
                    <h1>This is app</h1>
                    <div>
                        <img onClick={this.props.showUploader} src={this.props.imgurl} id='profilePic' alt={this.props.first}/>
                        <Link to="/friends">Link to friends page</Link>
                    </div>
                    {/* NEED TO ADD LAST TO ALT */}

                </div>
            )
        }
}
