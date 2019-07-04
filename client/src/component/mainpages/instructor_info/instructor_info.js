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
            cnic:this.props.login.loggedInUser.cnic,
            name: '',
            email: '',
            biography: '',
            pic: ''
        }

    }

    componentDidMount() {
        if(this.props.login.loggedInUser.rollno){
        fetch('/st_supervisor_info', {
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
    }else
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

    render() {
        return (
            <div id='instructor_info_main_container' >
                <div id='instructor_info_container'>
                    <h4 align='left'>Supervisor Info</h4>
                    <hr className='hr' />

                    <table id='instructor_info'>
                        {/* <caption>Instructor's Info</caption> */}
                        {/* <hr /> */}
                        <tr>
                            <th>Supervisor Name:</th>
                            <td>{this.state.name}</td>
                        </tr>

                        <tr>
                            <th>Email:</th>
                            <td>{this.state.email}</td>
                        </tr>
                    </table>

                    <h4 align='left'>Supervisor Biography</h4>
                    <div id='main-cont-sp'>
                        <div id='biography-container'>
                            <span align='justify'>
                                {this.state.biography}
                            </span>
                        </div>
                        <div id='s_p_p_container'><img id='s_p_p' src={"/"+this.state.pic } /></div>

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

