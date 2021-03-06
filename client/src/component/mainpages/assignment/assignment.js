import React, { Component } from 'react';
import { connect } from 'react-redux';
import './assignment.css';


class Sup_AssignmentDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            display1: 'none',
            display2: 'none'
        };


        

    }
    componentDidMount(){
            fetch('/sup_assignment_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((assignments) => {

                if (assignments) {
                this.setState({ 
                    
                    assignments : assignments ,
                    display1: 'block',
                });
            }else{
                this.setState({display2:'block'})
            }
            })
        }

    render() {
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
                                    <th>No</th>
                                    <th>Roll No</th>
                                    <th className='a_topic_title'>Title</th>
                                    <th className='a_topic_title'>Topic</th>
                                    <th className='a_marks'>Assignment</th>
                                    <th className='a_marks'>Due Date</th>
                                    <th className='a_marks'>Total Marks</th>
                                    <th className='a_marks'>Marks Obtained</th>

                                </tr>

 
                                {this.state.assignments.map( (assignment) => {
                                    return <tr>
                                        <td>{assignment.no}</td>
                                        <td>{assignment.rollno}</td>
                                        <td>{assignment.title}</td>
                                        <td>{assignment.topic}</td>
                                        <td><a href={assignment.file} download  id='f-dowload'>(Download File)</a></td>
                                        <td id='d-date'>{assignment.due_date}</td>
                                        <td >{assignment.total_marks}</td>
                                        <td >{assignment.obtain_marks}</td>

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

// let ConnectedSup_AssignmentDisplay = connect((store) => {

//     return {
//         login: store.loginReducer
//     }
// })(Sup_AssignmentDisplay);


export default Sup_AssignmentDisplay;
