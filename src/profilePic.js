import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


const mapStateToProps = function(state) {
    return {
        // id:state.id && state.id
    };
};

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgurl:'',
            first: '',
            last: '',

        }

}

// componentWillUpdate(nextProps, nextState) {
// //WILL HIDE SIDEBAR WHEN MIDDLE OF SCREEN IS CLICKED
//    if (this.props.showUploader) {
//      document.getElementsByClassName('clickObj')[0].addEventListener('click', this.props.hideUploader);
//    }
//
//
// }

        render(){
            if(this.props.id){
                var id= this.props.id;
            }
            return(
                <div className='appHeaderWrapper'>
                    <img src='/vertical.svg' onClick={this.props.showUploader} id='hamburger-menu'/>
                        <Link to='/'><img src={this.props.imgurl} id='profilePic' alt={this.props.first}/></Link>
                        <Link id='about-link' to='/about'>About <br/>Track#Share</Link>
                        {/* <h6>{recipientId} just sent you a friend request</h6> */}
                        {/* <Link to="/friends"><h5 className='nav-item'>Friends???</h5></Link>
                        <Link to= "/online"><h5 className='nav-item'>Who's Online</h5></Link>
                        <Link to="/chat"><h5 className='nav-item'>Chat Room</h5></Link> */}

                    {/* NEED TO ADD LAST TO ALT */}

                </div>
            )
        }
}
