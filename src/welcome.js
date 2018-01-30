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
                <img src='../trackshare1.png' className='logoPageTop'/>
                <div className='welcome-wrapper clickObj'>
                {/* <Logout /> */}
                {this.props.children}
                <div><Link className='font-white log-reg-btn' to="/">Register</Link></div>

                <br/>
                <div><Link className='font-white log-reg-btn' to="/login">Login</Link></div>

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
