import React from 'react';
import axios from 'axios';

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

        console.log('running handleSubmit on login', this.state);

        const { email, password} = this.state;
        const data = {email, password}

        axios.post('/login', data)
        .then(resp => {
            if (resp.data.success) {
                location.replace('/');

            } else {
                console.log('there was an error in axios post');
                this.setState({
                    error: true,
                    email:'',
                    password:''
                })
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.error && <div>YOU MESSED UP</div>}
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.email} name= 'email' placeholder='email' type='text'/>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.password} name= 'password' placeholder='password' type='password'/>
                <button onClick={() => this.handleSubmit() }>Log In</button>
            </div>
        )
    }
}
