import React, { Component } from 'react';
// import './groups.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

class Editor_Vivaa extends Component {

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
            groups: [],
            vivas: [],
            width: '',
            startDate: '',
            endDate: '',
            vivaDate:'',
            display1: true,
            display2: false

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
            groups: [
                ...this.state.groups,
                student
            ],
            selectedStudents: this.state.selectedStudents

        })

    }

    // Delete Group

    deleteGroup = (viva, evt) => {

        this.setState({
            groups: [
                ...this.state.groups,
                viva
            ]
        })

        let data = {

            no: viva._id,
            // no: group.no,
        }

        fetch('/delete_viva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp) {

                let target = this.state.vivas.find((viva) => {
                    return resp._id == viva._id;
                })

                let index = this.state.vivas.indexOf(target)


                this.state.vivas.splice(index, 1)
                this.setState({
                    vivas: this.state.vivas
                })
                alert('Viva Deleted Successfully')


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
    handleChange2 = (e) =>{
        this.setState({
            [e.target.name] : e.target.value

        })
    }

    handleChange(student, evt) {
        let newChild = evt.target.value;

        // alert(newChild);

        let target = this.state.groups.find((group) => {
            return group.groupid == newChild;
        })

        let index = this.state.groups.indexOf(target)


        this.state.groups.splice(index, 1)
        // this.setState({

        // })

        this.setState({

            [evt.target.name]: evt.target.value.toUpperCase(),
            selectedStudents: [
                ...this.state.selectedStudents,
                target
            ],
            groups: this.state.groups


            // supervisor: evt.target.value
        })
        console.log(this.state.selectedStudents)
    }

    submit = (e) => {
        e.preventDefault();

debugger;
        let data = {
            groupid: this.state.selectedStudents.map((item) => {
                return item.groupid;
            }),
            // groupid: this.state.groupid,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            vivaDate: this.state.vivaDate,
            display1: this.state.display1,
            display2: this.state.display2

        }

        fetch('/add_viva', {
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
                    startDate: '',
                    endDate: '',
                    no: '',
                    title: ''

                });
                alert('Viva Successfully Created');
            }
        })
    }
    componentDidMount() {
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
            const filterStudents = groups.filter(el=>{
                return el.no == ''
            })

            if (filterStudents) {
                this.setState({
                    groups: filterStudents 

                });
            } else {
                console.log('Err')
               
            }
            // if (groups) {
            //     this.setState({

            //         groups: groups,
            //         // display3: groups.display3,
            //         // display4: groups.display4,
            //         // display1: 'block',
            //     });
            // } else {
            //     // this.setState({ display2: 'block' })
            //     console.log('Err')
            // }
        })

        // if (!this.props.login.loggedInUser.department) {
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

            // fetch('/get_supervisors', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'Application/json'
            //     },
            //     body: JSON.stringify(this.state)
            // }).then((resp) => resp.json()).then((supervisors) => {

            //     if (supervisors) {
            //         this.setState({
            //             supervisors: supervisors
            //         });
            //     } else {
            //         // this.setState({ display2: 'block' })
            //         console.log('Err')

            //     }
            // })
        }
    // }


    render() {

        fetch('/viva_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((viva) => {

            // groups = groups.sort((prev, next) => {
            //     return prev.rollno - next.rollno;
            // })
            // debugger;
            if (viva) {
                this.setState({

                    vivas: viva,
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
                        <div className='pcontainer-editor-r' id='create_group' align='left' ><p id={'user-type'} className={'p-r'}><b> Create Viva</b></p></div>
                        <form onSubmit={this.submit}>
                            <table className={'tbl-result'} id='make_groups'  >
                                <tbody>
                                    {/* <tr>
                                        <th className='title_st'>No:</th>
                                        <td ><input type='text' className='group_id_g' name='no' required='required' placeholder='Enter No' value={this.state.no} onChange={this.change} /></td>
                                    </tr> */}
                                  
                                    <tr>


                                        <th className='' id='st_list' >Viva List:</th>
                                        <td  >
                                            <select id='multi_st_list' multiple='multiple' value={this.state.selectedStudents}  >
                                                {/* <option value=' select student'>Select Student</option> */}
                                                {this.state.groups.map((group) => {

                                                    return <option value={group.groupid} onDoubleClick={this.handleChange.bind(this, group)}>{group.groupid}</option>
                                                }
                                                )}

                                            </select>
                                        </td> 
                                        <td className='st_list'  ><div id='st_list_container'>
                                            <span className='st_list_title' >Selected</span>
                                            <br />
                                            <br />
                                            {this.state.selectedStudents.map((student) => {
                                                return <sapn>
                                                    <span className='st_list_item'> {student.groupid} </span>
                                                    <span><FontAwesomeIcon icon={faTrash} onDoubleClick={this.deleterollno.bind(this, student)} /></span>
                                                    <br />
                                                </sapn>
                                            })}

                                        </div></td>
                                        {/* <td></td> */}
                                    </tr>
                                    <tr>
                                        <td></td>
                                            <td><input type='date' name='startDate' value={this.state.startDate} required onChange={this.handleChange2} /></td>
                                    </tr>
                                    <tr>
                                    <td></td>

                                            <td><input type='date' name='endDate' value={this.state.endDate} required onChange={this.handleChange2}  /></td>
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
                                            <th className='grp_id' >Viva Dataes</th>
                                            <th className='grp_id' >Viva date</th>
                                            <th className='grp_id' hidden={this.props.login.loggedInUser.rollno}>Delete</th>

                                        </tr>


                                        {this.state.vivas.map((viva) => {

                                            return <tr>
                                                {/* <td  >{group.no}</td> */}
                                                
                                                <td className='grp_id_v'>
                                                {viva.groupid.map((item) =>{
                                                    return <span>{item}</span>
                                                })

                                                }
                                                </td>
                                                <td className='grp_id_v'>{viva.startDate} <b>to</b>  {viva.endDate}</td>
                                                <td className='grp_id_v'>{viva.vivaDate}</td>

                                                {/* <td className='show_assign'>{assignment.topic}</td> */}
                                              
                                                <td hidden={this.props.login.loggedInUser.rollno} ><button id='btn_delete' onClick={this.deleteGroup.bind(this, viva)}><FontAwesomeIcon icon={faTrash} /></button></td>
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

let Editor_Viva = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Editor_Vivaa);


export default Editor_Viva;



// import React, { Component } from 'react';
// import './viva.css'

// class Editor_Viva extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             groupid: '',
//             startDate: '',
//             endDate: '',
//             vivaDate:''
//         }
//     }
//     handleChange(evt) {
//         // let { value, min, max } = evt.target;
//         // value = Math.max(Number(min), Math.min(Number(max), Number(value)));


//         this.setState({
//             [evt.target.name]: evt.target.value,
//         })
//     }
//     submitAssignment = (e) => {

//         e.preventDefault();
       
//         fetch('/viva', {
//             method: 'POST',
//             body: JSON.stringify(this.state),
//         }).then((resp) => resp.json()).then((resp) => {
//             ;
//             if (resp.success == false) {
//                 alert('Assignment Already Assigned')

//             } else if (resp.groupid) {
               



//                 alert('Assignment Successfully Published to :' + resp.groupid);

//             } else {
//                 alert('An error is occurd. Please try again')
//             }
//         })
//     }
//     render() {
//         return (
//             <div>
//                 <div id='main_viva' >
//                 <div id='container_h_viva'><span id='title_txt'>Create Viva Schedule</span></div>
//                 <div id='main_edit_assign'>
//                     <form onSubmit={this.submitAssignment}>
//                         <table className='tbl-result' >
//                             <tbody>
//                                 <tr>
//                                     <th className='e-a-t'>Group Id:</th>
//                                     <td ><select  className='gid_select' name='groupid'  required='required'  onChange={this.handleChange} value={this.state.groupid} >
//                                         <option>Please Select</option>
//                                         {this.state.groups.map((group) =>{
//                                             return <option>{group.groupid}</option>
//                                         })}
//                                         </select>
//                                     </td>
//                                     <th className='e-a-t'>Start Date:</th>
//                                     <td ><input type='date' className='b-td' name='startDate' required   onChange={this.handleChange} value={this.state.startDate} /></td>
//                                     <th className='e-a-t'>End Date:</th>
//                                     <td ><input type='date' className='b-td' name='endDate' required onChange={this.handleChange} value={this.state.endDate} /></td>
//                                 </tr>
                               
//                                 <tr>
//                                     <td >
//                                         <input type='submit' className={'r-btn'} value='Publish Schedule' />
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </form>
//                 </div>
                
//             </div>
//             </div>

//         );
//     }
// }

// export default Editor_Viva;
