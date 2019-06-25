import React, { Component } from 'react';
import './profile.css';
import store from '../../../store/store';
import { connect } from 'react-redux';;



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.login.loggedInUser.name,
            fname: this.props.login.loggedInUser.fname,
            email: this.props.login.loggedInUser.email,
            phone: this.props.login.loggedInUser.phone,
            password: this.props.login.loggedInUser.password,
            rollno: this.props.login.loggedInUser.rollno,
            department: this.props.login.loggedInUser.department,
            program: this.props.login.loggedInUser.program,
            startdate: this.props.login.loggedInUser.startdate,
            enddate: this.props.login.loggedInUser.enddate,
            cnic: this.props.login.loggedInUser.cnic,
            designation: this.props.login.loggedInUser.designation,
            g_id: this.props.login.loggedInUser.g_id,
            type: 'password',
            score: 'null'

        }
        this.showHide = this.showHide.bind(this);
        this.passwordStrength = this.passwordStrength.bind(this);
        // this.handleInput = this.handleInput.bind(this);   
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    passwordStrength = (e) => {
        console.log('hellow');
        if (e.target.value === '') {
            this.setState({
                score: 'null'
            })
        }
        else {
            var pw = e.target.value;
            this.setState({
                score: pw.score
            });
        }

    }

    handleInput = (evt) => {

        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value
        }, () => {
            fetch('/update_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((resp) => {

                store.dispatch({
                    type: 'update_profile_success',
                    payload: resp
                });
            });
        });

    }


    //  this.handleInput.bind(this, 'password');

    render() {

        return (
            <div>
                <div hidden={!this.props.login.loggedInUser.rollno}>
                <form>
                    <table className={'tbl-profile'}  >
                        <tbody>
                            <tr><p id={'user-type'} className={'p-p'}><b>Student Profile</b></p></tr>
                            <tr>
                                <th>Name</th>
                                <td className={'p-td'}><span>{this.state.name}</span></td>
                                <th>Roll No</th>
                                <td className={'p-td'}><span>{this.state.rollno}</span></td>
                                {/* <td className={'p-pic'}  rowSpan={'4'}><span></span>Profile pic Placed here</td> */}
                            </tr>
                            <tr>
                                <th>Father Name</th>
                                <td className={'p-td'}><span>{this.state.fname}</span></td>
                                <th>Group ID</th>
                                <td className={'p-td'}><span>{this.state.g_id}</span></td>
                                {/* <td className={'p-pic'}></td> */}

                            </tr>
                            <tr>
                                <th>Department</th>
                                <td className={'p-td'}>{this.state.department}<span></span></td>
                                <th>Phone</th>
                                <td className={'p-td'}> <input placeholder={'Phone no here'} value={this.state.phone} name='phone' onChange={this.handleInput} /><span></span></td>
                                {/* <td ></td> */}

                            </tr>
                            <tr>
                                <th>Program</th>
                                <td className={'p-td'}><span>{this.state.program}</span></td>
                                <th>Email</th>
                                <td className={'p-td'}><input placeholder={'Email no here'} name='email' onChange={this.handleInput} value={this.state.email} /></td>
                            </tr>
                            <tr >
                                <th>Session</th>
                                <td className={'p-td'}><span>{this.state.startdate} <b>To</b> {this.state.enddate}</span></td>
                                <th>Password</th>
                                <td className={'p-td'}> <input type={this.state.type} name='password' className="password__input" onChange={(event) => { this.handleInput(event); this.passwordStrength(event); }} value={this.state.password} />

                                    {/* onChange={this.passwordStrength} */}
                                    <span className="password__show" onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}</span>
                                    <span className="password__strength" value={this.state.score} />
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </form>
            </div>
            <div hidden={this.props.login.loggedInUser.rollno}>
                <form>
                    <table className={'tbl-profile'}  >
                        <tbody>
                            <tr><p id={'user-type'} className={'p-p'}><b>Student Profile</b></p></tr>
                            <tr>
                                <th>Name</th>
                                <td className={'p-td'}><span>{this.state.name}</span></td>
                                <th>CNIC</th>
                                <td className={'p-td'}><span>{this.state.cnic}</span></td>
                                {/* <td className={'p-pic'}  rowSpan={'4'}><span></span>Profile pic Placed here</td> */}
                            </tr>
                            <tr>
                                <th>Father Name</th>
                                <td className={'p-td'}><span>{this.state.fname}</span></td>
                                <th>Password</th>
                                <td className={'p-td'}> <input type={this.state.type} name='password' className="password__input" onChange={(event) => { this.handleInput(event); this.passwordStrength(event); }} value={this.state.password} /> 
                                <span className="password__show" onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}</span>
                                    <span className="password__strength" value={this.state.score} />
                                    </td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td className={'p-td'}>{this.state.department}<span></span></td>
                                <th>Phone</th>
                                <td className={'p-td'}> <input placeholder={'Phone no here'} value={this.state.phone} name='phone' onChange={this.handleInput} /><span></span></td>
                                {/* <td ></td> */}

                            </tr>
                            <tr>
                                <th>Designation</th>
                                <td className={'p-td'}><span>{this.state.designation}</span></td>
                                <th>Email</th>
                                <td className={'p-td'}><input placeholder={'Email no here'} name='email' onChange={this.handleInput} value={this.state.email} /></td>
                            </tr>
                           

                        </tbody>
                    </table>
                </form>
            </div>
        </div >

    )
    }
}

let ConnectedProfile = connect((store) => {

    return {
        login: store.loginReducer
    }
})(Profile);

export default ConnectedProfile;