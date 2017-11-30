import React from 'react';
import Logo from './logo'
import ProfilePic from './profilePic'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/user').then(({ data }) => {
            console.log('this is data: ',data);
            this.setState(data);
        })
    }
    render() {
        const setImage = (imgUrl) => {
            this.setState({
                profilePic: imgUrl
            })
        };
        if (!this.state.id) {
            return null;
        }
        return (
            <div>
                <Logo />
                <ProfilePic
                    image={this.state.profilePic}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={() => this.setState({ uploaderIsVisible: true })}
                />
                {this.state.uploaderIsVisible && <UploadProfilePic setImage={setImage}
                />}
            </div>
        )
    }
}
