import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import store from '../../../store/store';
import DefaultHeader from '../../defaultPages/header/defaultheader';
// import DefaultRouts from '../../../defaultRoutes/defaultRouts';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            fname: '',
            email: '',
            phone: '',
            password: '',
            rollno: '',
            department: '',
            program: '',
            startdate: '',
            enddate: '',
            groupid: '',
            supervisorname: '',
            cnic: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleInput = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value

        })
    }
    submitForm = (e) => {
        e.preventDefault();
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp._id) {
                alert('User Already Exist');
            } else if (resp.success) {
                store.dispatch({
                    type: 'user_signedup_success',
                    payload: resp
                });
                this.props.history.push('/to_login')
            }
        })
    }

    render() {
        return (
            <div>
                {/* <DefaultHeader /> */}
                <div id='grandmain_container'>

                    <div id={'maincontainer11'}>
                        <h2>Sign Up Here!</h2>
                        <div id={''}>
                            <form onSubmit={this.submitForm}>
                                <table className='tbl_signup' cellSpacing='10'>
                                    <tr>
                                        <th>

                                            <label id={''}>Name</label>
                                        </th>
                                        <td>

                                            <input id={''} type='text' name='name' required placeholder='Name' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>F Name</label>
                                        </th>
                                        <td>

                                            <input id={''} type='text' name='fname' required placeholder='Father Name' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Email</label>
                                        </th>
                                        <td>

                                            <input id={''} type='email' name='email' required placeholder='eg. (someone@example.com)' onChange={this.handleInput} />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Phone</label>
                                        </th>
                                        <td>

                                            <input id={''} type='tel' name='phone' required placeholder='eg.(0000-0000000)' pattern='[0-9]{4}-[0-9]{7}' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Password</label>
                                        </th>
                                        <td>

                                            <input id={''} type='password' required name='password' placeholder='Password' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Roll No</label>
                                        </th>
                                        <td>

                                            <input type='number' name='rollno' placeholder='Roll No' required onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Cnic</label>
                                        </th>
                                            <td>
                                            <input type='numeric' maxLength='13' minLength='13' required name='cnic' placeholder='eg. (0000000000000)' onChange={this.handleInput} />

                                            </td>

                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Department</label>
                                        </th>
                                        <td>

                                            <select name='department' id={''} required onChange={this.handleInput} >
                                                <option>Select Your Department</option>
                                                <option>Computer Science</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Program</label>
                                        </th>
                                        <td>

                                            <select name='program' id={''} required onChange={this.handleInput} >
                                                <option>Select Your Program</option>
                                                <option>BS Computer Science</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Session</label>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>From</label>
                                        </th>
                                        <td>

                                            <input type='date' name='startdate' id={''} required onChange={this.handleInput} ></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={'to'}>To</label>
                                        </th>
                                        <td>

                                            <input type='date' name='enddate' id={''} required onChange={this.handleInput} ></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>

                                            <input className={'btn-signup1'} type='submit' name='signup' value={'Sign Up'} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <Link to='/' className={'anchor'}>Have an Account  ?</Link>
                                        </td>
                                    </tr>
                                </table>

                                <br></br>

                                {/* Form Ends */}
                                <br></br>

                                {/* <a href={"#"} class={'anchor'}>Forget Password?</a>

                        <br></br>
                        <input id={'btn'} type='submit' name='LogIn' value={'Login'} />
                        <br></br> */}

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Signup;