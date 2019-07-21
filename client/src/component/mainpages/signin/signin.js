import React, { Component } from 'react';
import './signin.css';
import { withRouter } from 'react-router-dom';
import store from '../../../store/store';


class Signin extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cnic: '',
			password: '',
			status: ''
 
		}
		this.handleInput = this.handleInput.bind(this)
		this.submitForm = this.submitForm.bind(this)
	}
	handleInput = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
			[evt.target.name]: evt.target.value,
		})
	} 


	submitForm = (e) => {
		e.preventDefault();
		// console.log(this.state.rollno, this.state.password, this.state.status);
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		}).then((resp) => resp.json()).then((resp) => {
			debugger;
			if (resp._id) {
				console.log('user found');
				store.dispatch({
					payload: resp,
					type: 'LOGGED_IN_SUCCESS'
				})
				this.props.history.push('/app');
				// alert('User Found');
			} else {
				this.props.history.push('/');
				document.getElementById('err_msg').innerText = 'Invalid CNIC No or Password';
			}

		})
		
	}
	render() {
		return (
			<div>
				<div id={'maincontainer'}>
					{/* <h2>Login</h2> */}
					<form onSubmit={this.submitForm} className='signin_form'>
						<p id='err_msg'></p>

						<label id={'idlabel2'}>CNIC:</label>
						<input id={'idinpt2'} required={'required'} maxLength='13' type='numeric' name='cnic' placeholder='Please enter 13 digit Cnic' onChange={this.handleInput} />
						<br></br>
						<label id={'pass2'}>Password:</label>
						<input id={'passinpt2'} required={'required'} type='password' name='password' placeholder='Please enter your password' onChange={this.handleInput} />
						<br></br>
						
						<br></br>

						<br></br>
						<input id={'btn9'} type='submit' name='LogIn' value={'Login'} />
						<br></br>
						{/* <a href={"#"} id={'anchor2'}>Forget Password?</a> */}

					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(Signin);