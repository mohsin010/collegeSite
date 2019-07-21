import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../store/reducers/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';


class ResultDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rollno: this.props.login.loggedInUser.rollno,
            rollno1: '',
            assignments: [],
            marks: '',
            grade: '',
            display1: 'none',
            display2: 'none'
        };




    }
    deleteMarks = (assignment, evt) => {
        debugger;
        // this.setState({
        // [evt.target.name]:evt.target.value
        // })


        let data = {

            rollno: assignment.rollno,
        }

        fetch('/delete_marks', {
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
                alert('Result Deleted Successfully')


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

            rollno: assignment.rollno,
            obtain_marks: evt.target.value
        }

    }

    render() {
        if (this.state.rollno) {
            fetch('/result_display', {
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
                        display2: 'block',

                    });
                } else {
                    this.setState({ display1: 'none' })
                }
            })
        } else {
            fetch('/sup_result_display', {
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
                        display2: 'block',
                    });
                } else {
                    this.setState({ display1: 'none' })
                }
            })
        }
        return (
            <div>
                    <div id='nn_Assignment' style={{ display: this.state.display1 }} ><span>No Result Declared Yet</span></div>
                <div id='assignment_main_container' >
                    <div style={{ display: this.state.display2 }}>

                        <div className='pcontainer-editor-r' align='left' ><p id={'user-type'} className={'p-r'}><b>Result</b></p></div>

                        <div >

                            <table id='tbl-assignment' className='tbl-marks' >
                                {/* <hr className='hr' />                     */}
                                <tbody>
                                    {/* <caption>Instructor's Info</caption> */}
                                    {/* <hr /> */}

                                    <tr>
                                        {/* <th id='a_no'>No</th> */}
                                        <th className='th-result' >Roll No</th>
                                        <th className='a_topic_title-a'>Group ID</th>
                                        <th className='a_topic_title-a'>Marks</th>
                                        <th className='a_marks-a'>Grade</th>
                                        <th hidden={this.props.login.loggedInUser.rollno}>Delete</th>

                                    </tr>


                                    {this.state.assignments.map((assignment) => {

                                        return <tr>
                                            {/* <td>{assignment.no}</td> */}
                                            <td >{assignment.rollno}</td>
                                            <td>{assignment.groupId}</td>
                                            <td >{assignment.marks}</td>
                                            <td >{assignment.grade}</td>
                                            <td hidden={this.props.login.loggedInUser.rollno}><button id='btn_delete' onClick={this.deleteMarks.bind(this, assignment)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>

                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

let ConnectedResultDisplay = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(ResultDisplay);


export default ConnectedResultDisplay;
