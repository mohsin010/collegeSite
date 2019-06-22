import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
            cnic:''
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
            }else if(resp.success){
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
                <div id='grandmain-container'>

                    <div id={'maincontainer1'}>
                        <h2>Sign Up Here!</h2>
                        <div id={'submaincontainer1'}>
                            <form onSubmit={this.submitForm}>
                                <label id={'namlabel'}>Name</label>
                                <input id={'name'} type='text' name='name' placeholder='Name' onChange={this.handleInput} />
                                <br></br>

                                <label id={'flabel'}>F Name</label>
                                <input id={'fnam'} type='text'  name='fname' placeholder='Father Name' onChange={this.handleInput} />
                                <br></br>

                                <label id={'emaillabel'}>Email</label>
                                <input id={'email'} type='email' name='email' placeholder='eg. (someone@example.com)' onChange={this.handleInput} />
                                <br></br>

                                <label id={'phonelabel'}>Phone</label>
                                <input id={'phone'} type='tel' name='phone' placeholder='eg.(0000-0000000)' pattern='[0-9]{4}-[0-9]{7}' onChange={this.handleInput} />
                                <br></br>
                                <label id={'pass'}>Password</label>
                                <input id={'passinpt1'} type='password' name='password' placeholder='Password' onChange={this.handleInput} />
                                <br></br>
                                
                                <label id={'rollnolabel'}>Roll No</label>
                                <input type='number' name='rollno' placeholder='Roll No' onChange={this.handleInput} />
                                <br></br>
                                 
                                <label id={'cniclabel'}>Cnic</label>
                                <input type='numeric' maxLength='13' minLength='13' name='cnic' placeholder='eg. (0000000000000)' onChange={this.handleInput} />
                                <br></br>
                                <label id={'deptlabel'}>Department</label>
                                <select name='department' id={'department'} onChange={this.handleInput} >
                                    <option>Select Your Department</option>
                                    <option>Computer Science</option>
                                </select>
                                <br></br>
                                <label id={'prolabel'}>Program</label>
                                <select name='program' id={'program'} onChange={this.handleInput} >
                                    <option>Select Your Program</option>
                                    <option>BS Computer Science</option>
                                </select>
                                <br></br>
                                <label id={'sessionlabel'}>Session</label>
                                <br></br>
                                <label id={'from'}>From</label>
                                <input type='date' name='startdate' id={'fromdate'} onChange={this.handleInput} ></input>
                                <br></br>
                                <label id={'to'}>To</label>
                                <input type='date' name='enddate' id={'enddate'} onChange={this.handleInput} ></input>
                                <br></br>

                                {/* Form Ends */}
                                <input id={'btn'} type='submit' name='signup' value={'Sign Up'} />
                                <br></br>
                                <Link to='/' className={'anchor'}>Have an Account  ?</Link>

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