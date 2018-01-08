import React from 'react';
import Logo from './logo'
import ProfilePic from './profilePic'
import axios from './axios'
import Logout from './logout'
import UploadProfilePic from './uploadProfilePic'
import Profile from './profile'
import UpdateProfileInfo from './updateProfileInfo'
import OtherUsers from './otherusers'
import FriendButton from './friendbutton'
import socketConnections from './socket'



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.showBioUpdate=this.showBioUpdate.bind(this)
        this.sendFriendRequest = this.sendFriendRequest.bind(this)

    }

    showBioUpdate(){
        this.setState({bioUpdateIsVisible: !this.state.bioUpdateIsVisible})
}

    sendFriendRequest(){
        // console.log('clicked inside sendFriendRequest');
        // this.setState({status: 'Friend Request Sent'});


    }

    componentDidMount() {
        socketConnections()
        axios.get('/user').then(({ data }) => {
            // console.log('this is the logged in user data: ',data);
            this.setState(data);
        })


    }
    render() {
        const {first, last, bio, imgurl, email, showBioUpdate, sendFriendRequest} = this.state
        const children = React.cloneElement(this.props.children, {
            showBioUpdate: this.showBioUpdate,
            sendFriendRequest: this.sendFriendRequest,
            first,
            last,
            bio,
            imgurl,
            email,
        })
        const setImage = (imgurl) => {
            this.setState({
                imgurl: imgurl
            })
        };
        const setBio = bio => {
            this.setState({
                bio
            })
        };
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div>
                <Logo />
                {/* <Logout /> */}
                <ProfilePic
                    imgurl={this.state.imgurl}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={() => this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible })}

                />
                {this.state.uploaderIsVisible && <UploadProfilePic setImage={setImage}/>}
                {children}
                {/* <OtherUsers /> */}
                {this.state.bioUpdateIsVisible && <UpdateProfileInfo setBio = {setBio} />}

            </div>
        )
    }
}
