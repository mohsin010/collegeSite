import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import store from '../../../store/store';
import DefaultHeader from '../../defaultPages/header/defaultheader';
// import DefaultRouts from '../../../defaultRoutes/defaultRouts';

class Sup_Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            fname: '',
            email: '',
            phone: '',
            password: '',
            department: '',
            cnic: '',
            designation: '',
            description: '',
            file: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.submitForm1 = this.submitForm1.bind(this)
    }

    pickFile = (e) => {
        e.preventDefault()
        debugger;
        this.setState({
            file: e.target.files[0]
        })
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
        })
    }

    submitForm1 = (e) => {
        e.preventDefault();
        debugger;
        let data = this.state;
        let formData = new FormData();
        formData.append('name', data.name)
        formData.append('fname', data.fname)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('password', data.password)
        formData.append('department', data.department)
        formData.append('cnic', data.cnic)
        formData.append('designation', data.designation)
        formData.append('description', data.description)
        formData.append('file', data.file)
        debugger;

        fetch('/sup_signup', {

            method: 'POST',

            body: formData,
        }).then((resp) => resp.json()).then((resp) => {
            this.setState({
                name: '',
                fname: '',
                email: '',
                phone: '',
                password: '',
                department: '',
                cnic: '',
                designation: '',
                description: '',
                file: ''
            })

            if (resp._id) {
                alert('User Already Exist');
            } else if (resp.success) {
                store.dispatch({
                    type: 'user_signedup_success',
                    payload: resp
                });
                // this.props.history.push('/')
                alert('User Created Successfully');

            }
        })
    }

    render() {
        return (
            <div>
                {/* <DefaultHeader /> */}
                <div id='grandmain_container'>

                    <div id='maincontainer11' className=''>
                        <h2>Create Supervisor's Login!</h2>
                        <div id={'submaincontainer1'}>
                            <form onSubmit={this.submitForm1}>

                                <table className='tbl_signup' cellSpacing='10'>
                                    <tr>
                                        <th>

                                            <label id={''}>Name:</label>
                                        </th>
                                        <td>

                                            <input id={''} type='text' name='name' required placeholder='Name' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>F Name:</label>
                                        </th>
                                        <td>

                                            <input id={''} type='text' name='fname' required placeholder='Father Name' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Email:</label>
                                        </th>
                                        <td>

                                            <input id={''} type='email' name='email' required placeholder='eg. (someone@example.com)' onChange={this.handleInput} />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Phone:</label>
                                        </th>
                                        <td>

                                            <input id={''} type='tel' name='phone' required placeholder='eg.(0000-0000000)' pattern='[0-9]{4}-[0-9]{7}' onChange={this.handleInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Password:</label>
                                        </th>
                                        <td>

                                            <input id={''} type='password' required name='password' placeholder='Password' onChange={this.handleInput} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>

                                            <label id={''}>Cnic:</label>
                                        </th>
                                        <td>
                                            <input type='numeric' maxLength='13' minLength='13' required name='cnic' placeholder='eg. (0000000000000)' onChange={this.handleInput} />

                                        </td>

                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Department:</label>
                                        </th>
                                        <td>

                                            <select name='department' id={''} value={this.state.department} required onChange={this.handleInput} >
                                                <option>Select Your Department:</option>
                                                <option>Computer Science</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Designation</label>
                                        </th>
                                        <td>

                                            <select name='designation' id={''} required value={this.state.designation} onChange={this.handleInput} >
                                                <option>Select Desegnation</option>
                                                <option>Lecturer</option>
                                                <option>Associate Professor</option>
                                                <option>Assistant Professor</option>
                                                <option>Professor</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>

                                            <label id={''}>Description</label>
                                            <label id={''}>From:</label>
                                        </th>
                                        <td>
                                            <textarea rows="4" cols="   " type='textarea' name='description' required value={this.state.description} required placeholder='Description' onChange={this.handleInput} />

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label id={'inpt_file_pic'}>Profile Picture</label>

                                        </th>
                                        <td>
                                            <input type='file' name='file' required onChange={this.pickFile} />

                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>

                                            <input className={'btn-signup1'} type='submit' name='signup' value={'Create Account'} />
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <th></th>
                                        <td>
                                            <Link to='/' className={'anchor'}>Have an Account  ?</Link>
                                        </td>
                                    </tr> */}
                                </table>

                                
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Sup_Signup;