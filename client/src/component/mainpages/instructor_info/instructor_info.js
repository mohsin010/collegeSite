import React, { Component } from 'react';
import './instructor_info.css';
import { connect } from 'react-redux';
import store from '../../../store/store';

class Instructor_Info_disp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            supervisor: this.props.login.group.supervisor,
            groupid: this.props.login.group.groupid,
            cnic: this.props.login.loggedInUser.cnic,
            name: '',
            email: '',
            biography: '',
            pic: ''
        }

    }

    // componentDidMount() {
    ///blow code is of this function
    // }

    render() {
        // debugger;
        if (this.props.login.loggedInUser.rollno) {
            var data = {
                rollno: this.props.login.loggedInUser.rollno,
                supervisor: this.props.login.group.supervisor

            }
            fetch('/st_supervisor_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).then((resp) => {
                debugger;
                if (resp) {
                    this.setState({
                        name: resp.name,
                        email: resp.email,
                        biography: resp.description,
                        pic: resp.file
                    })

                }

            })
        } else {
            // let data= {
            //     rollno: this.props.login.loggedInUser.rollno
            // }
            fetch('/sup_supervisor_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((resp) => {
                debugger;
                if (resp) {
                    this.setState({
                        name: resp.name,
                        email: resp.email,
                        biography: resp.description,
                        pic: resp.file
                    })


                }

            })
        }


        return (
            <div id='instructor_info_main_container' >
                <div id='instructor_info_container'>
                    <h4 align='left'>Supervisor Info</h4>
                    <hr className='hr' />
                    <div id='tbl_info_contain'>
                        <table id='instructor_info'>
                            {/* <caption>Instructor's Info</caption> */}
                            {/* <hr /> */}
                            <tr>
                                <th>Supervisor Name:</th>
                                <td>{this.state.name}</td>
                            </tr>
                            {/* <tr>
                            <td></td>
                            <td></td>

                            <td></td>

                        </tr> */}

                            <tr>
                                <th>Email:</th>
                                <td>{this.state.email}</td>

                            </tr>
                        </table>
                        <div id='s_p_p_container'><img id='s_p_p' src={"/" + this.state.pic} /></div>
                    </div>

                    <h4 align='left'>Supervisor Biography</h4>
                    <div id='main-cont-sp'>
                        <div id='biography-container'>
                            <span align='justify'>
                                {this.state.biography}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

let Instructor_Info = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Instructor_Info_disp);


export default Instructor_Info;

