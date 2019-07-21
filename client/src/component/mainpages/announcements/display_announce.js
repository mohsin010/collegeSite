import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import newest from '../../../data/newest.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './document.css';

class Display_announce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            display1: 'none',
            display2: 'none',
            search:'',
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

    nextAnnouncement = () => {
        // debugger;
        if (this.state.announementIndex < this.state.assignments.length-1) {
            this.setState({
                announementIndex: ++this.state.announementIndex 
            });
        }
        // else{
        //     this.setState({

        //         announementIndex : this.state.assignments.length -1
        //     })
        // }
    }
    previousAnnouncement = () => {
        debugger;
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

    // newest = (assignment) => {
    //     return <div dangerouslySetInnerHTML={{ __html: assignment.body }} >

    //                         </div>
    // }

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

        if (this.props.login.loggedInUser.rollno) {
            let data = {
                rollno: this.props.login.loggedInUser.rollno
            }
            fetch('/announcement_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).then((assignments) => {
                if (assignments) {
                    
                    this.setState({

                        assignments: assignments,
                        display1: 'block',
                    });
                } else {
                    this.setState({ display2: 'block' })
                }
            })
        } else if(this.props.login.loggedInUser.designation) {
            let data = {
                name: this.props.login.loggedInUser.name
            }
            fetch('/sup_announcement_display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data)
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
        }else{
            fetch('/admin_announcement_display', {
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
        var display = false;
    var filterAnnouncements = this.state.assignments.filter(
        (annuncement) => {
            if (annuncement.groupid.indexOf(this.state.search)) {

                return annuncement.groupid.toLowerCase().indexOf(this.state.search) !== -1;
            } else {
                // alert('not founn')
                // this.setState({
                //    display: true
                // })
                display = true
                return annuncement.groupid.toLowerCase().indexOf(this.state.search) !== -1;

                // return alert('not found')
            }


        }
    )


        return (

            // id='assignment_main_container'
            <div>
                <div className='main-c-editor c_overflow' id='main-title-disp' style={{ display: this.state.display1 }}  >
                    <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Announcement Yet</span></div>
                    {/* <div  style={{ display: this.state.display1 }}> */}
                    <div className='pcontainer' align='left' ><span className='ptitle'>Announcement</span></div>
                    <div className='searching_assignment' hidden={this.props.login.loggedInUser.rollno}>
                            <span className='search-ass-conatiner'>
                        <input type='text' placeholder='Search by GroupId' onChange={this.updateSearch} value={this.state.search} className='search-ass-input' />
                        {/* <button onClick={this.updateSearch} className='search-ass-btn'>Search</button> */}
                        <button onClick={this.restSearch} className='search-ass-reset'>Reset</button>

                        </span>
                            </div>
                    <div hidden={!this.props.login.loggedInUser.rollno}>
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



                    </div>

                    <div id='n-main-disp' hidden={this.props.login.loggedInUser.rollno}>

                        <div  >
                            <div>
                                {filterAnnouncements.map((assignment) => {


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
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}</span>

                                                <span className='group_id_display'>{assignment.groupid}</span>
                                            </div>
                                            <div className='dv_link'>

                                                <a onClick={this.openWin.bind(this, assignment)}  >{assignment.title}</a>
                                            </div>

                                        </div>
                                        <button id='btn_delete' className='btnn-disp' title='delete' hidden={this.props.login.loggedInUser.rollno} onClick={this.deleteAssignment.bind(this, assignment)}><FontAwesomeIcon icon={faTrash} /></button>

                                        {/* <button className='btnn-disp' title='delete' hidden={this.props.login.loggedInUser.rollno} onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button> */}
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
                                <div className='td_nf' style={{ display: display ? 'none' : 'block' }}>
                                    <span  ><span >Record Not Found</span></span>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


let ConnectedDisplay_announce = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Display_announce);


export default ConnectedDisplay_announce;
