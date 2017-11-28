import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange() {

    }
    handleSubmit() {
        axios.post('/register', {
            first: this.first,
            email: this.email,
            password: this.password
        }).then(resp => {
            if (resp.data.success) {
                location.replace('/');
            } else {
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
                <input onChange={() => this.handleChange(e.target.name, e.target.value) }/>
                <input />
                <input />
                <input />
                <button onClick={() => this.submit() }></button>
            </div>
        )
    }
}
