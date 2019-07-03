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
            groupid: ''
        };
        this.handleChange = this.handleChange.bind(this);


    }


    change = (e) => {
        debugger;
        this.setState({
            [e.target.name]: e.target.value,
            // groupid: e.target.value
        })
    }
    deleterollno = (student, evt) =>{
         let newChild = evt.target.value;

        // alert(newChild);

        // let target = this.state.selectedStudents.find((student) => {
        //     return student.rollno == newChild;
        // })

        let index = this.state.selectedStudents.indexOf(student);


        this.state.selectedStudents.splice(index, 1);
        debugger;

        this.setState({
            students: [
                ...this.state.students,
                student
            ],
            selectedStudents: this.state.selectedStudents

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
        debugger;
       
        let data = {
            st_group: this.state.selectedStudents.map((item)=>{
                return item.rollno;
            }),
            supervisor: this.state.supervisor,
            groupid: this.state.groupid
        }

        fetch('/add_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((groups) => {

            if (!groups.success == false) {
                this.setState({
                    selectedStudents: [],
                    supervisor: '',
                    groupId: ''
                });
                alert('Group Successfully Created');
            } else {
                alert("Group Already Exist");
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

          

                if (students) {
                    this.setState({
                        students: students
                        
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
                    this.setState({ display2: 'block' })
                }
            })
        }
    }

    render() {




        return (
            <div>

                <div id='msg_disp_container'>
                    <div>
                        <div className='pcontainer-editor-r' id='create_group' align='left' ><p id={'user-type'} className={'p-r'}><b> Create Group</b></p></div>
                        <form onSubmit={this.submit}>
                            <table className={'tbl-result'} id='make_groups'  >
                                <tbody>
                                    <tr>
                                        <th className='title_st'>Group ID:</th>
                                        <td ><input type='text' className='group_id_g' name='groupid' required='required' placeholder='Enter Group ID' value={this.state.groupid} onChange={this.change} /></td>
                                        <td></td>
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

                    <div className='pcontainer' id='msg_list' align='left' ><span className='ptitle'>Groups List</span>


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
