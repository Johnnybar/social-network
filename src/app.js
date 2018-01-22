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
        this.state = {
            // uploaderIsVisible:false
        }
        this.showBioUpdate=this.showBioUpdate.bind(this)
        this.hideBioUpdate=this.hideBioUpdate.bind(this)
        // this.sendFriendRequest = this.sendFriendRequest.bind(this)
        // this.collapse = this.collapse.bind(this)

    }


    showBioUpdate(e){
        if (this.state.bioUpdateIsVisible == false){
            this.setState({ bioUpdateIsVisible: true })
        }
            else{
                this.setState({bioUpdateIsVisible:false})
            }
        }
    hideBioUpdate(e){
    if (this.state.bioUpdateIsVisible == true){
        e.stopPropagation()
        this.setState({ bioUpdateIsVisible: false })
    }
        else{
            e.preventDefault()
        }
}



    componentDidMount() {
        this.setState({uploaderIsVisible:false})
        this.setState({bioUpdateIsVisible:false})
        socketConnections()
        axios.get('/user').then(({ data }) => {
            // console.log('this is the logged in user data: ',data);
            this.setState(data);
        })


    }
    render() {
        const {first, last, bio, imgurl, email, showBioUpdate, sendFriendRequest,hideBioUpdate} = this.state
        const children = React.cloneElement(this.props.children, {
            showBioUpdate: this.showBioUpdate,
            sendFriendRequest: this.sendFriendRequest,
            hideBioUpdate:this.hideBioUpdate,
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
                    showUploader={(e) => {
                        if (this.state.uploaderIsVisible == false){
                            this.setState({ uploaderIsVisible: true })
                        }
                            else{
                                this.setState({uploaderIsVisible: false})
                            }
                        }
                 }
                    hideUploader={(e) => {
                        if (this.state.uploaderIsVisible == true){
                            e.stopPropagation()
                            this.setState({ uploaderIsVisible: false })
                        }
                            else{
                                e.preventDefault()
                            }
                    }
                }

                />
                {this.state.uploaderIsVisible==true && <UploadProfilePic setImage={setImage}/>}
                {children}
                {/* <OtherUsers /> */}
                {this.state.bioUpdateIsVisible==true && <UpdateProfileInfo setBio = {setBio} onBlur= {this.collapse}/>}

            </div>
        )
    }
}
