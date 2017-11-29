import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleChange(name, value) {
        this.setState({
            [name]:value
        })
    }
    handleSubmit() {
        console.log('running handleSubmit', this.state);
        axios.post('/register', {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
        }).then(resp => {
            if (resp.data.success) {
                console.log('success i guess');
                location.replace('/');
                // return resp.json();

            } else {
                console.log('there was an error');
                this.setState({
                    error: true
                })
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <div>YOU MESSED UP</div>}
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.first} name= 'first' placeholder='first' type='text'/>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.last} name= 'last' placeholder='last' type='text'/>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value={this.state.email} name= 'email' placeholder='email' type='text'/>
                <input onChange={(e) => this.handleChange(e.target.name, e.target.value) } value= {this.state.password} name= 'password' placeholder='password' type="password"/>
                <button onClick={() => this.handleSubmit() } type='submit'>Submit</button>
            </div>
        )
    }
}
