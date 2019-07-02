import React, { Component } from 'react';
import './groups.css';
import { connect } from 'react-redux';

class Groups_Create extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     showComponent: false,
        // };
        this.state = {
            students: [

            ],
            supervisors: [

            ],

            selectedStudents: [

            ],

            supervisor: 'ahmed'
        };
        this.handleChange = this.handleChange.bind(this);


    }

    change = (e) =>{
        debugger;
        this.setState({
            supervisor: e.target.value
        })
    }

    handleChange(evt ) {
        debugger;
        this.setState({
            // [evt.target.name]: evt.target.value,
            // [evt.target.name]: evt.target.value.toUpperCase(),
            // [evt.target.name]: evt.target.value,
            // [evt.target.name]: evt.target.value.toUpperCase(),
            selectedStudents: evt.target.value,
            supervisor: evt.target.value
        })
    }

    render() {

        if (!this.props.login.loggedInUser.department) {
            fetch('/get_students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((students) => {

                // assignments = assignments.sort((prev, next) => {
                //     return prev.rollno - next.rollno;
                // })

                if (students) {
                    this.setState({
                        students: students
                        // selected: null,
                        // msgs: msgs,
                        // display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })

            fetch('/get_supervisors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((supervisors) => {

                // assignments = assignments.sort((prev, next) => {
                //     return prev.rollno - next.rollno;
                // })

                if (supervisors) {
                    this.setState({
                        supervisors: supervisors
                        // selected: null,
                        // msgs: msgs,
                        // display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        }


        return (
            <div>

                <div id='msg_disp_container'>
                    <div>
                        <div className='pcontainer-editor-r' id='create_group' align='left' ><p id={'user-type'} className={'p-r'}><b> Upload Result</b></p></div>
                        <form onSubmit={this.submitData}>
                            <table className={'tbl-result'} id='make_groups'  >
                                <tbody>
                                    <tr>
                                        <th className='t-rd' id='st_list' >Students List:</th>
                                        <td  >
                                            <select value={this.state.supervisor} onchange={this.change} >
                                                <option value =' select student'>Select Student</option>
                                                {this.state.students.map((student) => {

                                                    return <option value={student.rollno} >{student.rollno}</option>
                                                }
                                                )}

                                            </select>
                                        </td>
                                        <th className='t-rd' id='sup_list' >Supervisors:</th>
                                        <td className='sup_list_drop'>

                                            <select>
                                                <option>Select Supervisor</option>
                                                {this.state.supervisors.map((supervisor) => {

                                                    return <option onClick={this.handleChange.bind(this, supervisor)}>{supervisor.name}</option>
                                                }
                                                )}


                                            </select>
                                        </td>

                                    </tr>
                                    <br />
                                    <tr id='main_tr_group'>
                                        <td></td>
                                        {/* <td>fasdfasdfads</td> */}
                                        <td></td>
                                        <td className='st_list' ><div id='st_list_container'>
                                            <span className='st_list_title' >St_List</span>
                                            <br />
                                            <br />
                                            {this.state.selectedStudents.map((student) => {
                                                return  <span className='st_list_item'> {student.rollno} </span>
                                                // <br />
                                            })}

                                        </div></td>
                                        {/* <td className='sup_list'  >sup_list</td> */}

                                        {/* <div id='main_selected_group' >
                                                <div>
fasdfasf
                                                </div>
                                                <div>

                                                </div>

                                        </div> */}
                                    </tr>
                                    <tr>
                                        <td >
                                            <input type='submit' className={'r-btn'} value='Save' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </form>

                    </div>

                    <div className='pcontainer' id='msg_list' align='left' ><span className='ptitle'>Groups List</span>


                    </div>
                </div>




            </div>





        )
    }
}

let Groups = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Groups_Create);


export default Groups;
