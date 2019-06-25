import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../store/reducers/login';


class AssignmentDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rollno: this.props.login.loggedInUser.rollno,
            rollno1: '',
            assignments: [],
            obtain_marks: '',
            display1: 'none',
            display2: 'none'
        };




    }
    deleteAssignment = (assignment, evt) => {
        debugger;
        // this.setState({
        // [evt.target.name]:evt.target.value
        // })

        
        let data = {

            rollno : assignment.rollno,
            no:assignment.no,
        }

            fetch('/delete_assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).then((resp) => {
                if (resp) {

                    let target = this.state.assignments.find((assignment)=>{
                        return resp._id == assignment._id;
                    })

                    let index =this.state.assignments.indexOf(target)


                    this.state.assignments.splice(index, 1)
                    this.setState({
                        assignments:this.state.assignments
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
            assignments:this.state.assignments
        })

        let data = {

            rollno : assignment.rollno,
            no:assignment.no,
            obtain_marks : evt.target.value
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
                        obtain_marks:  resp.obtain_marks
                    })
                    

                } else {
                    alert('Error is Occured');
                }

            });

    }
    componentWillReceiveProps(nextprops) {
        if(nextprops.assignments){
        this.setState({
        
            // assignments:nextprops.assignments
        })
    }
    }
    // componentDidMount() {
    //     if (this.state.rollno) {
    //         fetch('/assignment_display', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'Application/json'
    //             },
    //             body: JSON.stringify(this.state)
    //         }).then((resp) => resp.json()).then((assignments) => {

    //             if (assignments) {
    //                 // this.setState((prevState) => {
    //                 //     return{
    //                 //         assignment: [...prevState, assignments],
    //                 //         obtain_marks:assignments.obtain_marks,
    //                 //     display1: 'block',
    //                 //     }
    //                 // })
    //                 this.setState({

    //                     assignments: assignments,
    //                     obtain_marks:assignments.obtain_marks,
    //                     display1: 'block',
    //                 });
    //             } else {
    //                 this.setState({ display2: 'block' })
    //             }
    //         })
    //     } else {
    //         fetch('/sup_assignment_display', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'Application/json'
    //             },
    //             body: JSON.stringify(this.state)
    //         }).then((resp) => resp.json()).then((assignments) => {

    //             assignments = assignments.sort((prev, next) => {
    //                 return prev.rollno - next.rollno;
    //             })

    //             if (assignments) {
    //                 this.setState({

    //                     assignments: assignments,
    //                     display1: 'block',
    //                 });
    //             } else {
    //                 this.setState({ display2: 'block' })
    //             }
    //         })
    //     }
    // }

    render() {
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
                        obtain_marks:assignments.obtain_marks,
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

                if (assignments) {
                    this.setState({

                        assignments: assignments,
                        display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        }
        return (
            <div>
                <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Assignment Assigned Yet</span></div>
                <div id='assignment_main_container' style={{ display: this.state.display1 }}>
                    <div >

                        <table id='tbl-assignment' >
                            <caption id='cap'><h3 align='left'>Assignments</h3></caption>
                            {/* <hr className='hr' />                     */}
                            <tbody>
                                {/* <caption>Instructor's Info</caption> */}
                                {/* <hr /> */}

                                <tr>
                                    <th id='a_no'>No</th>
                                    <th hidden={this.props.login.loggedInUser.rollno}>Roll No</th>
                                    <th className='a_topic_title'>Title</th>
                                    <th className='a_topic_title'>Topic</th>
                                    <th className='a_marks'>Assignment</th>
                                    <th className='a_marks'>Due Date</th>
                                    <th className='a_marks'>Total Marks</th>
                                    <th className='a_marks'>Marks Obtained</th>
                                    <th hidden={this.props.login.loggedInUser.rollno}>Delete</th>

                                </tr>


                                {this.state.assignments.map((assignment) => {

                                    return <tr>
                                        <td>{assignment.no}</td>
                                        <td hidden={this.props.login.loggedInUser.rollno}>{assignment.rollno}</td>
                                        <td>{assignment.title}</td>
                                        <td>{assignment.topic}</td>
                                        <td><a href={assignment.file} download id='f-dowload'>(Download File)</a></td>
                                        <td id='d-date'>{assignment.due_date}</td>
                                        <td >{assignment.total_marks}</td>
                                        <td >< input hidden={this.props.login.loggedInUser.rollno} name='obtain_marks' title='Edit' id='marks' type='numeric' onChange={this.handleInput.bind(this, assignment)} value={assignment.obtain_marks}  /></td>
                                        <td hidden={this.props.login.loggedInUser.rollno}><button id='btn_delete' onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button></td>
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
