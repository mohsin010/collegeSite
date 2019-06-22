import React, { Component } from 'react';
import { connect } from 'react-redux';


class AssignmentDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rollno: this.props.login.loggedInUser.rollno,
            no: '',
            title: '',
            topic: '',
            due_date: '',
            file: '',
            display1: 'none',
            display2: 'none'
        };
      
            
        if (this.state.rollno) {
            fetch('/assignment_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((resp) => {
                if (resp.rollno || !resp.rollno) {
                    if (resp == true ) {
                        this.setState({
                            
                            display1: 'block'

                        })
                    }else if(resp.rollno){
                        this.setState({
                            no: resp.no,
                            title: resp.title,
                            topic: resp.topic,
                            due_date: resp.due_date,
                            file: resp.file,
                            display1: 'block'

                        })
                    } else {
                        console.log('hyy');
                        this.setState({
                            display1:'none',
                            display2: 'block'
                        })
                }
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

                        <table id='tbl-assignment' >
                            <caption id='cap'><h3 align='left'>Assignments</h3></caption>
                            {/* <hr className='hr' />                     */}
                            <tbody>
                                {/* <caption>Instructor's Info</caption> */}
                                {/* <hr /> */}
                                <tr>
                                    <th>No</th>
                                    <th>Title</th>
                                    <th>Topic</th>
                                    <th>Assignment</th>
                                    <th>Due Date</th>
                                </tr>
                                <tr>
                                    <td>{this.state.no}</td>
                                    <td>{this.state.title}</td>
                                    <td>{this.state.topic}</td>
                                    <td><a href={this.state.file} download id='f-dowload'>(Download File)</a></td>
                                    <td id='d-date'>{this.state.due_date}</td>
                                </tr>
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
        login: store.loginReducer
    }
})(AssignmentDisplay);


export default ConnectedAssignmentDisplay;
