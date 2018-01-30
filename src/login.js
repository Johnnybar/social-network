import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };

    }
    handleChange(name, value) {
        this.setState({
            [name]:value
        })
    }
    handleSubmit() {

        // console.log('running handleSubmit on login', this.state);

        const { email, password} = this.state;
        const data = {email, password}

        axios.post('/login', data)
        .then(resp => {
            if (resp.data.success) {
                location.replace('/');

            } else {
                // console.log('there was an error in axios post');
                this.setState({
                    error: true,
                    email:'',
                    password:''
                })

            }
        }).catch((err)=>{
            // console.log('there was an error in axios post');
            this.setState({
                error: true,
                email:'',
                password:''
            })
        })
    }

    render() {
    //     if (this.state.error){
    //         console.log('WHASS');
    //     var errorMsg = <span className="error-msg">Error</span>;
    // }
        return (
            <div>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.email} name= 'email' placeholder='email' type='text'/>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.password} name= 'password' placeholder='password' type='password'/>
                <button className= 'default-btn' onClick={() => this.handleSubmit() }>Log In</button>
                {/* <div><i>To view website in demo mode, log in with these credentials:<br/>email:<strong>'email'</strong>, password:<strong>'password'</strong></i></div> */}

                {this.state.error && <div className='error'>Something's off... <br/> Did you fill out all fields and type the correct name/password?</div>}
                {/* {errorMsg} */}
            </div>
        )
    }
}
