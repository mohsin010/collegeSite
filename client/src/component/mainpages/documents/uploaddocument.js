import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './document.css';

class Display_document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rollno: this.props.login.loggedInUser.rollno,
            assignments: [],
            display1: 'none',
            display2: 'none',
            search:''
        };


    }

    deleteAssignment = (assignment, evt) => {


        let data = {

            linkadress: assignment.linkadress,
        }

        fetch('/delete_document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            debugger;
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
    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0, 20)
        });

    }
    restSearch = (e) => {
        this.setState({
            search: ''
        })
    }




    render() {
        var display = false;
    var filterdDoc = this.state.assignments.filter(
        (doc) => {
            if (doc.linkadress.toLowerCase().indexOf(this.state.search)) {

                return doc.linkadress.toLowerCase().indexOf(this.state.search) !== -1;
            } else {
                // alert('not founn')
                // this.setState({
                //    display: true
                // })
                display = true
                return doc.linkadress.toLowerCase().indexOf(this.state.search) !== -1;

                // return alert('not found')
            }


        }
    )
        if (this.state.rollno) {
            fetch('/document_display', {
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
                        // obtain_marks: assignments.obtain_marks,
                        display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        } else {
            fetch('/sup_document_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((assignments) => {

                // assignments = assignments.sort((prev, next) => {
                //     return prev.rollno - next.rollno;
                // })

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
        // console.log("im Hell")
        return ( 
            // id='assignment_main_container'
            <div className='main-c-editor' id='main-title-disp'  >
                {/* <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Assignment Assigned Yet</span></div> */}
                {/* <div  style={{ display: this.state.display1 }}> */}
                <div className='pcontainer' id='title-doc' align='left' ><span className='ptitle'>Documents</span></div>
                <div className='searching_assignment'>
                            <span className='search-ass-conatiner'>
                        <input type='text' placeholder='Search By Title' onChange={this.updateSearch} value={this.state.search} className='search-ass-input' />
                        {/* <button onClick={this.updateSearch} className='search-ass-btn'>Search</button> */}
                        <button onClick={this.restSearch} className='search-ass-reset'>Reset</button>

                        </span>
                            </div>
                <div >

                    <div id='n-main-disp'>
                        {filterdDoc.map((assignment) => {

                            return <div >

                                <div className='dv_dateL'>
                                <span id='m-span'>{new Date(assignment.time).toLocaleDateString('en-us', { 
                                            month: 'short'
                                            })}</span>
                                <span id='d-span'>{new Date(assignment.time).toLocaleDateString('en-us', { 
                                            day: 'numeric'
                                            })}</span>
                                </div>
                                {/* <br></br> */}
                                <div align='left' className='assign'>
                                    <div className='dv_time'>
                                        <span >{new Date(assignment.time).toLocaleDateString('en-us', { 
                                            day:'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                            })}</span>
                                    </div>
                                    <div className='dv_link'>
                                        <a href={assignment.file} download>{assignment.linkadress}</a>
                                    </div>

                                </div>
                                <button className='btnn-disp' title='delete' hidden={this.props.login.loggedInUser.rollno} onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button>
                                <hr id='disp_hr' />
                            </div>
                            // return <tr>
                            //     <td>{assignment.time}</td>
                            //     <td><a href={assignment.file} download id='f-dowload'>{assignment.linkadress}</a></td>
                            //     <td id='d-date'>{assignment.due_date}</td>
                            //     <td hidden={this.props.login.loggedInUser.rollno}><button id='btn_delete' onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button></td>
                            // </tr>

                        })
                        }
                    </div>

                    <div className='td_nf' style={{ display: display ? 'none' : 'block' }}>
                                    <span  ><span >Record Not Found</span></span>

                                </div>
                </div>
            </div>
        )
    }
}


let ConnectedDisplay_document = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Display_document);


export default ConnectedDisplay_document;
