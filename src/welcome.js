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
                <h1>This is welcome</h1>
                <Logout />
                {this.props.children}
                <Link to="/">Register</Link>
                <br/>
                <Link to="/login">Login</Link>


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
