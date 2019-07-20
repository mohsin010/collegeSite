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
            file:''
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
                file:''
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
                <div id='grandmain-container'>

                    <div id='maincontainer1' className= 'maincontainer1_sup'>
                        <h2>Create Supervisor's Login!</h2>
                        <div id={'submaincontainer1'}>
                            <form onSubmit={this.submitForm1}>
                                <label id={'namlabel'}>Name</label>
                                <input id={'name'} type='text' name='name' required placeholder='Name' value={this.state.name} onChange={this.handleInput} />
                                <br></br>

                                <label id={'flabel'}>F Name</label>
                                <input id={'fnam'} type='text' name='fname' required placeholder='Father Name' value={this.state.fname} onChange={this.handleInput} />
                                <br></br>

                                <label id={'emaillabel'}>Email</label>
                                <input id={'email'} type='email' name='email' required placeholder='eg. (someone@example.com)'  value={this.state.email} onChange={this.handleInput} />
                                <br></br>

                                <label id={'phonelabel'}>Phone</label>
                                <input id={'phone'} type='tel' name='phone' maxLength='12' required placeholder='eg.(0000-0000000)' value={this.state.phone} pattern='[0-9]{4}-[0-9]{7}' onChange={this.handleInput} />
                                <br></br>
                                <label id={'pass'}>Password</label>
                                <input id={'passinpt1'} type='password' required name='password' placeholder='Password' value={this.state.password} onChange={this.handleInput} />
                                <br></br>
  

                                <label id={'cniclabel'}>Cnic</label>
                                <input type='numeric' maxLength='13' minLength='13' name='cnic' required placeholder='eg. (0000000000000)' value={this.state.cnic} onChange={this.handleInput} />
                                <br></br>
                                <label id={'deptlabel'} className='deptlabel_sup'>Department</label>
                                <select name='department' id={'department'} required   value={this.state.department} onChange={this.handleInput} >
                                    <option>Select Your Department</option>
                                    <option>Computer Science</option>
                                </select>
                                <br></br>
                                <label id={'desiglabel'}>Designation</label>
                                <select name='designation' id={'program'} required  value={this.state.designation} onChange={this.handleInput} >
                                    <option>Select Desegnation</option>
                                    <option>Lecturer</option>
                                    <option>Associate Professor</option>
                                    <option>Assistant Professor</option>
                                    <option>Professor</option>
                                </select>
                                <br></br>
                                <label id={'descrlabel'}>Description</label>
                                <textarea rows="4" cols="45" type='textarea' name='description' required value={this.state.description} required placeholder='Description' onChange={this.handleInput} />
                                <br></br>
                                <label id={'inpt_file_pic'}>Profile Picture</label>
                                <input  type='file' name='file'   required  onChange={this.pickFile} />
                                <br></br>

                                {/* Form Ends */}
                                <input id={'btn'} type='submit' name='signup' value={'Create Account'} />
                                <br></br>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Sup_Signup;