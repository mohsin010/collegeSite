import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import './document.css';

class Display_notic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            display1: 'none',
            display2: 'none',
            search: ''

        };


    }

    deleteAssignment = (assignment, evt) => {


        let data = {

            linkadress: assignment.title,
        }
        fetch('/delete_notic', {
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
                alert('Notic Deleted Successfully')


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
        var filterdNotice = this.state.assignments.filter(
            (notice) => {
                if (notice.title.indexOf(this.state.search)) {

                    return notice.title.toLowerCase().indexOf(this.state.search) !== -1;
                } else {
                    // alert('not founn')
                    // this.setState({
                    //    display: true
                    // })
                    display = true
                    return notice.title.toLowerCase().indexOf(this.state.search) !== -1;

                    // return alert('not found')
                }


            }
        )

        if (this.state.rollno) {
            fetch('/notic_display', {
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
            fetch('/sup_notic_display', {
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
                    <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Notice Yet</span></div>
                    {/* <div  style={{ display: this.state.display1 }}> */}
                    <div className='pcontainer' align='left' ><span className='ptitle'>Notic</span></div>
                    <div className='searching_assignment'>
                        <span className='search-ass-conatiner'>
                            <input type='text' placeholder='Search By Name' onChange={this.updateSearch} value={this.state.search} className='search-ass-input' />
                            {/* <button onClick={this.updateSearch} className='search-ass-btn'>Search</button> */}
                            <button onClick={this.restSearch} className='search-ass-reset'>Reset</button>

                        </span>
                    </div>

                    <div >

                        <div id='n-main-disp'>
                            {filterdNotice.map((assignment) => {

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
                                        </div>
                                        <div className='dv_link'>

                                            <a onClick={this.openWin.bind(this, assignment)}  >{assignment.title}</a>
                                        </div>

                                    </div>
                                    <button className='btnn-disp' title='delete' hidden={this.props.login.loggedInUser.rollno || !this.props.login.loggedInUser.cnic} onClick={this.deleteAssignment.bind(this, assignment)}>Delete</button>
                                    <hr id='disp_hr' />
                                </div>


                            })
                            }
                        </div>

                    </div>
                        <div className='td_nf' style={{ display: display ? 'none' : 'block' }}>
                            <span  ><span >Record Not Found</span></span>

                        </div>



                </div>
            </div>
            // </div >
        )
    }
}


let ConnectedDisplay_notic = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Display_notic);


export default ConnectedDisplay_notic;
