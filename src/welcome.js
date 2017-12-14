import React, {Component} from 'react';
import Register from './register';
import Logo from './logo';
import Login from './login';
import { Link } from 'react-router';
import Logout from './logout';



export default class Welcome extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div>
                <img src='../trackshare.png' className='logoPageTop'/>
                <div className='section-wrapper'>
                {/* <Logout /> */}
                {this.props.children}
                <Link to="/">Register</Link>
                <br/>
                <Link to="/login">Login</Link>

            </div>
            </div>
        )
    }
}
// export default function Welcome(){
//     return (
//         <div>
//             <Logo />
//             <Register />
//             <Login />
//         </div>
//     )
// }
