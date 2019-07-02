import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import newest from '../../../data/newest.png';
// import './document.css';

class Display_announce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            display1: 'none',
            display2: 'none',
            currentAnnouncement: {},
            announementIndex: 0
        };


    }

    deleteAssignment = (assignment, evt) => {


        let data = {

            linkadress: assignment.title,
        }
        fetch('/delete_announcement', {
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
                alert('Announcement Deleted Successfully')


            } else {
                alert('Error is Occured');
            }

        });
    }



    openWin = (evt, title) => {
        let target1 = this.state.assignments.find((assignment) => {
            return evt.title == assignment.title;
        })

        let index2 = target1.body
        this.myWindow = window.open("", "myWindow", "width=800,height=500");
        this.myWindow.document.write(

            index2 + ' <br /> <button  onclick={window.close()}>Close</button>');
    }

    // newest = (assignment) => {
    //     debugger;
    //     return <div dangerouslySetInnerHTML={{ __html: assignment.body }} >

    //     </div>
    // }

    nextAnnouncement = () => {
        if (this.state.announementIndex < this.state.assignments.length) {
            this.setState({
                announementIndex: ++this.state.announementIndex
            });
        }
    }
    previousAnnouncement = () => {
        if (this.state.announementIndex > 0) {
            this.setState({
                announementIndex: --this.state.announementIndex
            });
        }
    }
    getOldest = () => {
        this.setState({
            announementIndex: 0
        });

    }
    getNewest = () => {
        this.setState({
            announementIndex: this.state.assignments.length - 1
        });
    }
    render() {

        if (this.props.login.loggedInUser.rollno) {
            fetch('/announcement_display', {
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
            fetch('/sup_announcement_display', {
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
            <div>
                <div className='main-c-editor' id='main-title-disp' style={{ display: this.state.display1 }}  >
                    <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Announcement Yet</span></div>
                    {/* <div  style={{ display: this.state.display1 }}> */}
                    <div className='pcontainer' align='left' ><span className='ptitle'>Announcement</span></div>
                    {/* hidden = {!this.props.login.loggedInUser.rollno} */}
                    {/* <div >
                        {this.state.assignments.map((assignment, index) => {
                            return <div className={index != this.state.announementIndex ? 'hide' : ''} dangerouslySetInnerHTML={{ __html: assignment.body }}>
                            </div>
                        })}

                        <div id='btn-navigate-container'>
                            <button className='btn-navigate' id='btn-newest' onClick={this.getOldest} title='Go to newest annuncements'></button>
                            <button className='btn-navigate' id='btn-Newer' onClick={this.previousAnnouncement} title='Go to newer annuncements'></button>
                            <button className='btn-navigate' id='btn-Older' onClick={this.nextAnnouncement} title='Go to older annuncements'></button>
                            <button className='btn-navigate' id='btn-Oldest' onClick={this.getNewest} title='Go to oldest annuncements'></button>

                        </div>




                    </div> */}

                    <div id='n-main-disp' hidden={this.props.login.loggedInUser.rollno}>


                        <div>
                            {this.state.assignments.map((assignment) => {


                                return <div>
                                    <div >

                                        <span id='m-span'>{new Date(assignment.time).toLocaleDateString('en-us', {
                                            month: 'short'
                                        })}</span>

                                        <span id='d-span'>
                                            {new Date(assignment.time).toLocaleDateString('en-us', {
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <br></br>
                                    <span
                                        className='assign'
                                        className='dv_time'>
                                        {new Date(assignment.time).toLocaleDateString('en-us', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}</span>
                                </div>
                                    <div className='dv_link'>

                                        <a onClick={this.openWin.bind(this, assignment)}  > {assignment.title}</a>
                                    </div>
                                    <div>
                                        <button className='btnn-disp' title='delete' hidden={this.props.login.loggedInUser.rollno} onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button>
                                        <hr id='disp_hr' />
                                    </div>

                                     
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
            // </div >
        )
    }
}




let ConnectedDisplay_announce = connect((store) => {

    return {

        login: store.loginReducer,
        assignments: store.login

    }(Display_announce);

}

export default ConnectedDisplay_announce;
