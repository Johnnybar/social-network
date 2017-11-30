import React from 'react';
import Logo from './logo'
import ProfilePic from './profilePic'
import axios from 'axios'
import Logout from './logout'
import UploadProfilePic from './uploadProfilePic'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log('this is the user data: ',data);
            this.setState(data);
        })
    }
    render() {
        const setImage = (imgurl) => {
            this.setState({
                imgurl: imgurl
            })
        };
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div>
                <Logo />
                <ProfilePic
                    imgurl={this.state.imgurl}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={() => this.setState({ uploaderIsVisible: true })}
                />
                {this.state.uploaderIsVisible && <UploadProfilePic setImage={setImage}
                />}
                <Logout />
            </div>
        )
    }
}
