import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../store/reducers/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


class AssignmentDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rollno: this.props.login.loggedInUser.rollno,
            no: '',
            groupid: '',
            assignments: [],
            obtain_marks: '',
            display1: 'none',
            display2: 'none',
            // display3: false,
            // display4: false,
            file: ''
        };




    }
    picFile = (e) => {
        debugger;
        this.setState({
            file: e.target.files[0]
        })
    }
    componentDidMount() {

        this.uploadSolvedAssinment = (assigment, e) => {
            e.preventDefault();
            debugger;
            let data = this.state;
            let no = assigment.no;
            let groupid = assigment.groupid;
            let formData = new FormData();
            formData.append('a', no);
            formData.append('b', groupid);
            formData.append('date', new Date().toLocaleDateString());
            formData.append('display3', false);
            formData.append('display4', true);

            formData.append('file', e.target.files[0])
            // let marks = {
            //     assigment: {
            //         groupid: data.groupid,
            //         no: data.no,
            //         obtain_marks: data.obtain_marks
            //     }
            // }
            fetch('/submit_assignment', {
                method: 'POST',
                body: formData,
            }).then((resp) => resp.json()).then((resp) => {
                debugger;
                if (resp.success == false) {
                    alert('Assignment Already Submitted')

                } else if (resp.success == true) {
                    // fetch('/sup_assignment_display', {
                    //     method: "POST"

                    // }).then((resp) => {
                    //     return resp.json()
                    // }).then((res) => {

                    // })
                    // this.refs.assigninput.value = '';
                    this.setState({
                        display1: 'block',
                        display2: 'none'
                    })
                    alert('Assignment Successfully Submitted');

                } else {
                    alert('An error is occurd. Please try again')
                }
            })
        }
    }

    deleteAssignment = (assignment, evt) => {
        debugger;
        // this.setState({
        // [evt.target.name]:evt.target.value
        // })


        let data = {

            groupid: assignment.groupid,
            no: assignment.no,
        }

        fetch('/delete_assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp) {

                let target = this.state.assignments.find((assignment) => {
                    return resp._id == assignment._id;
                })

                let index = this.state.assignments.indexOf(target)


                this.state.assignments.splice(index, 1)
                this.setState({
                    assignments: this.state.assignments
                })
                alert('Assignment Deleted Successfully')


            } else {
                alert('Error is Occured');
            }

        });
    }
    handleInput = (assignment, evt) => {
        debugger;
        // this.setState({
        // [evt.target.name]:evt.target.value
        // })

        assignment.obtain_marks = evt.target.value;
        this.setState({
            assignments: this.state.assignments
        })

        let data = {

            groupid: assignment.groupid,
            no: assignment.no,
            obtain_marks: evt.target.value
        }

        fetch('/assignments_marks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp) {
                this.setState({
                    obtain_marks: resp.obtain_marks
                })


            } else {
                alert('Error is Occured');
            }

        });
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.assignments) {
            this.setState({

            })
        }
    }

    componentDidMount(){
        if (this.state.rollno) {
            fetch('/assignment_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((assignments) => {

                if (assignments) {
                    // this.setState((prevState) => {
                    //     return{
                    //         assignment: [...prevState, assignments],
                    //         obtain_marks:assignments.obtain_marks,
                    //     display1: 'block',
                    //     }
                    // })
                    this.setState({

                        assignments: assignments,
                        obtain_marks: assignments.obtain_marks,
                        display3: assignments.display3,
                        display4: assignments.display4,
                        display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        } else {
            fetch('/sup_assignment_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((assignments) => {

                assignments = assignments.sort((prev, next) => {
                    return prev.rollno - next.rollno;
                })
                debugger;
                if (assignments) {
                    this.setState({

                        assignments: assignments,
                        display3: assignments.display3,
                        display4: assignments.display4,
                        display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        }
    }
  

    render() {
       
        return (
            <div>
                <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Assignment Assigned Yet</span></div>
                <div id='assignment_main_container' style={{ display: this.state.display1 }}>
                    <div >
                        <div className='pcontainer-editor-r' align='left' ><p id={'user-type'} className={'p-r'}><b> Assignment</b></p></div>
                        <table id='p_detail' hidden={!this.props.login.loggedInUser.rollno}>
                            <tr>
                                <th className='p_head'>Group Id</th>
                                <td className='p_info'>Group id here</td>
                            </tr>
                            <tr>
                                <th className='p_head'>Title</th>
                                <td className='p_info'>Title here</td>
                            </tr>
                            <tr>
                                <th className='p_head'>Supervisor Name</th>
                                <td className='p_info'>Name here</td>
                            </tr>
                        </table>
                        <table id='tbl-assignment' >
                            {/* <hr className='hr' />                     */}
                            <tbody>
                                {/* <caption>Instructor's Info</caption> */}
                                {/* <hr /> */}

                                <tr>
                                    <th id='a_no'>No</th>
                                    <th hidden={this.props.login.loggedInUser.rollno}>Group Id</th>
                                    <th className='a_topic_title'>Title</th>
                                    {/* <th className='a_topic_title'>Topic</th> */}
                                    <th className='a_marks'>Assignment</th>
                                    <th className='a_marks'>Due Date</th>
                                    <th className='a_marks' id='submit_assign'>Submit</th>
                                    <th className='a_marks'>Marks Obtained</th>
                                    <th hidden={this.props.login.loggedInUser.rollno}>Delete</th>

                                </tr>


                                {this.state.assignments.map((assignment) => {

                                    return <tr>
                                        <td >{assignment.no}</td>
                                        <td className='show_assign' hidden={this.props.login.loggedInUser.rollno}>{assignment.groupid}</td>
                                        <td className='show_assign'>{assignment.title}</td>
                                        {/* <td className='show_assign'>{assignment.topic}</td> */}
                                        <td ><a href={assignment.file} download id='f-dowload'>(Download File)</a></td>
                                        <td id='d-date'>{assignment.due_date}</td>
                                        {/* onChange={this.uploadSolvedAssinment.bind(this, assignment)} */}
                                        <td ><input type='file' name='subfile' ref='assigninput' style={{display: assignment.display3 ? 'block' : 'none'}}  value={this.state.subfile} />
                                            <a href={assignment.file} download id='f-dowload' style={{display: assignment.display4 ? 'block' : 'none'}}>(Download File)</a>
                                            <br />
                                            <span id='sub_d' style={{display: assignment.display4 ? 'block' : 'none'}}>Submit Date: {assignment.date}</span>
                                        </td>
                                        <td >< input hidden={this.props.login.loggedInUser.rollno} name='obtain_marks' title='Edit' id='marks' type='numeric'
                                            onChange={this.handleInput.bind(this, assignment)}
                                            value={assignment.obtain_marks} />
                                        </td>
                                        <td hidden={this.props.login.loggedInUser.rollno}><button id='btn_delete' onClick={this.deleteAssignment.bind(this, assignment)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>

                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}

let ConnectedAssignmentDisplay = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(AssignmentDisplay);


export default ConnectedAssignmentDisplay;
