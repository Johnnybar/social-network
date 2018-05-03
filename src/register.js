import React from 'react';
import axios from './axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      password: ''
    };

  }
  handleChange(name, value) {
    this.setState({[name]: value})
  }

  handleSubmit(e) {
    const {first, last, email, password} = this.state;
    const data = {
      first,
      last,
      email,
      password
    }

    axios.post('/register', data).then(resp => {
      if (resp.data.success!==false) {
        location.replace('/');

      } else {
        this.setState({error: true})
      }
    })
  }

  render() {
    return (<div className='register-form'>
      <input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={this.state.first} name='first' placeholder='first' type='text'/>
      <input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={this.state.last} name='last' placeholder='last' type='text'/>
      <input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={this.state.email} name='email' placeholder='email' type='text'/>
      <input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={this.state.password} name='password' placeholder='password' type="password"/>
      <button className='default-btn' onClick={() => this.handleSubmit()}>Submit</button>
      {this.state.error && <div className='error'>Something is not right, you may have chosen an already existing email</div>}
    </div>)
  }
}
