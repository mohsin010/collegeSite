import React, { Component } from 'react';
import './groups.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
            sendGroup: [],

            supervisor: '',
            groupid: '',
            no: '',
            title: '',
            groups: [],
            width: ''

        };
        this.handleChange = this.handleChange.bind(this);


    }


    change = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    deleterollno = (student, evt) => {
        let newChild = evt.target.value;

        // alert(newChild);

        // let target = this.state.selectedStudents.find((student) => {
        //     return student.rollno == newChild;
        // })

        let index = this.state.selectedStudents.indexOf(student);


        this.state.selectedStudents.splice(index, 1);


        this.setState({
            students: [
                ...this.state.students,
                student
            ],
            selectedStudents: this.state.selectedStudents

        })

    }

    // Delete Group

    deleteGroup = (group, evt) => {



        let data = {

            groupid: group.groupid,
            no: group.no,
        }

        fetch('/delete_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp) {

                let target = this.state.groups.find((group) => {
                    return resp._id == group._id;
                })

                let index = this.state.groups.indexOf(target)


                this.state.groups.splice(index, 1)
                this.setState({
                    groups: this.state.groups
                })
                alert('Group Deleted Successfully')


            } else {
                alert('Error is Occured');
            }

        });
        fetch('/get_students', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((students) => {

            const filterStudents = students.filter(el=>{
                return el.groupid == ''
            })

            if (filterStudents) {
                this.setState({
                    students: filterStudents 

                });
            } else {
                this.setState({ display2: 'block' })
            }
        })
    }

    handleChange(student, evt) {
        let newChild = evt.target.value;

        // alert(newChild);

        let target = this.state.students.find((student) => {
            return student.rollno == newChild;
        })

        let index = this.state.students.indexOf(target)


        this.state.students.splice(index, 1)
        // this.setState({

        // })

        this.setState({

            [evt.target.name]: evt.target.value.toUpperCase(),
            selectedStudents: [
                ...this.state.selectedStudents,
                target
            ],
            students: this.state.students


            // supervisor: evt.target.value
        })
        console.log(this.state.selectedStudents)
    }

    submit = (e) => {
        e.preventDefault();


        let data = {
            st_group: this.state.selectedStudents.map((item) => {
                return item.rollno;
            }),
            supervisor: this.state.supervisor,
            groupid: this.state.groupid,
            no: this.state.no,
            title: this.state.title
        }

        fetch('/add_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((groups) => {

            if (groups.success == false) {
                alert("Group Already Exist");

            } else {
                this.setState({
                    selectedStudents: [],
                    supervisor: '',
                    groupid: '',
                    no: '',
                    title: ''

                });
                alert('Group Successfully Created');
            }
        })
    }
    componentDidMount() {

        if (!this.props.login.loggedInUser.department) {
            fetch('/get_students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state)
            }).then((resp) => resp.json()).then((students) => {

                const filterStudents = students.filter(el=>{
                    return el.groupid == ''
                })

                if (filterStudents) {
                    this.setState({
                        students: filterStudents 

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

                if (supervisors) {
                    this.setState({
                        supervisors: supervisors
                    });
                } else {
                    // this.setState({ display2: 'block' })
                    console.log('Err')

                }
            })
        }
    }


    render() {

        fetch('/groups_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((groups) => {

            // groups = groups.sort((prev, next) => {
            //     return prev.rollno - next.rollno;
            // })
            // debugger;
            if (groups) {
                this.setState({

                    groups: groups,
                    // display3: groups.display3,
                    // display4: groups.display4,
                    // display1: 'block',
                });
            } else {
                // this.setState({ display2: 'block' })
                console.log('Err')
            }
        })


        return (
            <div>

                <div id='msg_disp_container'>
                    <div>
                        <div className='pcontainer-editor-r' id='create_group' align='left' ><p id={'user-type'} className={'p-r'}><b> Create Group</b></p></div>
                        <form onSubmit={this.submit}>
                            <table className={'tbl-result'} id='make_groups'  >
                                <tbody>
                                    {/* <tr>
                                        <th className='title_st'>No:</th>
                                        <td ><input type='text' className='group_id_g' name='no' required='required' placeholder='Enter No' value={this.state.no} onChange={this.change} /></td>
                                    </tr> */}
                                    <tr>
                                        <th className='title_st'>Group ID:</th>
                                        <td ><input type='text' className='group_id_g' name='groupid' required='required' placeholder='Enter Group ID' value={this.state.groupid} onChange={this.change} /></td>
                                    </tr>
                                    <tr>
                                        <th className='title_st'>Project Title:</th>
                                        <td ><input type='text' className='group_id_g' name='title' required='required' placeholder='Enter Project Title' value={this.state.title} onChange={this.change} /></td>
                                    </tr>
                                    <tr>


                                        <th className='' id='st_list' >Students List:</th>
                                        <td  >
                                            <select id='multi_st_list' multiple='multiple' value={this.state.selectedStudents}  >
                                                {/* <option value=' select student'>Select Student</option> */}
                                                {this.state.students.map((student) => {

                                                    return <option value={student.rollno} onDoubleClick={this.handleChange.bind(this, student)}>{student.rollno}</option>
                                                }
                                                )}

                                            </select>
                                        </td>
                                        <td className='st_list'  ><div id='st_list_container'>
                                            <span className='st_list_title' >St_List</span>
                                            <br />
                                            <br />
                                            {this.state.selectedStudents.map((student) => {
                                                return <sapn>
                                                    <span className='st_list_item'> {student.rollno} </span>
                                                    <span><FontAwesomeIcon icon={faTrash} onDoubleClick={this.deleterollno.bind(this, student)} /></span>
                                                    <br />
                                                </sapn>
                                            })}

                                        </div></td>
                                        {/* <td></td> */}
                                    </tr>
                                    <tr>
                                        <th className='title_st' id='sup_list' >Supervisors:</th>
                                        <td className='sup_list_drop'>

                                            <select name='supervisor' value={this.state.supervisor} onChange={this.change}>
                                                <option>Select Supervisor</option>
                                                {this.state.supervisors.map((supervisor) => {

                                                    return <option value={supervisor.name}>{supervisor.name}</option>
                                                }
                                                )}
                                            </select>
                                        </td>
                                    </tr>
                                    <br />
                                    <tr id='main_tr_group'>
                                        <td></td>
                                        {/* <td></td> */}
                                        {/* <tr>/ */}

                                        <td></td>

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
                </div>
                {/* <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Assignment Assigned Yet</span></div> */}
                    <div className='group_list_disp'>
                        <div className='pcontainer' id='groups_list' align='left'  ><span className='ptitle'>Groups List</span>
                            <div className='groups_tbl'>
                                <table id='p_detail' className='tbl_groups' hidden={!this.props.login.loggedInUser.rollno}>
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
                                            {/* <th id='a_no'>No</th> */}
                                            <th className='grp_id' >Group Id</th>
                                            <th className=''>Title</th>
                                            <th className='sup_title'>Supervisor</th>
                                            <th className=''>Progress</th>
                                            <th className='grp_id'>Members</th>
                                            <th className='grp_id' hidden={this.props.login.loggedInUser.rollno}>Delete</th>

                                        </tr>


                                        {this.state.groups.map((group) => {

                                            return <tr>
                                                {/* <td  >{group.no}</td> */}
                                                <td className='grp_id_v'>{group.groupid}</td>
                                                <td className='show_assign' className='tbl_group_val' id='project_title' >{group.title}</td>
                                                <td className='show_assign' className='tbl_group_val' >{group.supervisor}</td>
                                                <td className='show_assign' className='tbl_group_val' id='progress' ><div className='progress_container'><div className='progress_bar' style={{width: group.width}}>{group.width}</div></div></td>
                                                {/* <td className='show_assign'>{assignment.topic}</td> */}
                                                <td className='show_assign' >
                                                    {group.st_group.map((item) => {
                                                        return <span >{item}<br /></span>

                                                    })}
                                                </td>
                                                <td hidden={this.props.login.loggedInUser.rollno} ><button id='btn_delete' onClick={this.deleteGroup.bind(this, group)}><FontAwesomeIcon icon={faTrash} /></button></td>
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

let Groups = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Groups_Create);


export default Groups;
