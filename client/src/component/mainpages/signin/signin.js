import React, { Component } from 'react';
import './signin.css';
import { withRouter } from 'react-router-dom';
import store from '../../../store/store';


class Signin extends Component {

	constructor(props) {
		super(props)
		this.state = {
			rollno: '',
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
				document.getElementById('err_msg').innerText = 'Invalid Roll No or Password';
			}

		})
		
	}
	render() {
		return (
			<div>
				<div id={'maincontainer'}>
					{/* <h2>Login</h2> */}
					<form onSubmit={this.submitForm}>
						<p id='err_msg'></p>

						<label id={'idlabel2'}>Roll No</label>
						<input id={'idinpt2'} required={'required'} type='text' name='rollno' onChange={this.handleInput} />
						<br></br>
						<label id={'pass2'}>Password</label>
						<input id={'passinpt2'} required={'required'} type='password' name='password' onChange={this.handleInput} />
						<br></br>
						{/* <label id={'statusLabel2'}>Status</label> */}
						{/* <select name={'status'} id={'status2'} required  onChange={this.handleInput}>
																												<option value='' >Select Status</option>
																												<option value='admin'>Admin</option>
																										<option value='teacher'>Teacher</option>
																												<option value='student'>Student</option>
																								</select> */}
						<br></br>

						<br></br>
						<input id={'btn9'} type='submit' name='LogIn' value={'Login'} />
						<br></br>
						<a href={"#"} id={'anchor2'}>Forget Password?</a>

					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(Signin);