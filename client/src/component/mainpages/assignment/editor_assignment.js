import React, { Component } from 'react';
// import './result.css';
import Assignment from './assignment';
import CreateAssignment from './display_assignment';
import { connect } from 'react-redux';
import store from '../../../store/store';



class AssignmentEditor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            no: '',
            title: '',
            supervisorname: this.props.login.group.supervisor,
            topic: '',
            due_date: '',
            groupid: '',
            file: '',
            subfile:'',
            obtain_marks: '',
            date:'',
            display3:true,
            display4:false,
            groups:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitAssignmentMarks = this.submitAssignmentMarks.bind(this)


 
    }
    pickFile = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleChange(evt) {
        // let { value, min, max } = evt.target;
        // value = Math.max(Number(min), Math.min(Number(max), Number(value)));


        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            obtain_marks: ''

        })
    }



    submitAssignment = (e) => {
        debugger;

        e.preventDefault();
        let data = this.state;
        let formData = new FormData();
        formData.append('no', data.no);
        formData.append('title', data.title);
        formData.append('topic', data.topic);
        formData.append('due_date', data.due_date);
        formData.append('groupid', data.groupid);
        formData.append('display3', data.display3);
        formData.append('display4', data.display4);
        formData.append('date', data.date)
        formData.append('file', data.file);
        formData.append('subfile', data.subfile);
        formData.append('obtain_marks', data.obtain_marks)
        let marks = {
            assigment: {
                groupid: data.groupid,
                no: data.no,
                obtain_marks: data.obtain_marks
            }
        }
        fetch('/assignments', {
            method: 'POST',
            body: formData,
        }).then((resp) => resp.json()).then((resp) => {
            debugger;
            if (resp.success == false) {
                alert('Assignment Already Assigned')

            } else if (resp.groupid) {
                fetch('/sup_assignment_display', {
                    method: "POST"

                }).then((resp) => {
                    return resp.json()
                }).then((res) => {
                    // store.dispatch({
                    //     type: 'assignment_uploaded',
                    //     payload: res
                    // });
                })
                this.refs.assigninput.value = '';
                this.setState({
                    no: '',
                    title: '',
                    due_date: '',
                    groupid: '',
                    file: '',
                    subfile:'',
                    total_marks: '',
                    obtain_marks: ''
                })



                alert('Assignment Successfully Published to :' + resp.groupid);

            } else {
                alert('An error is occurd. Please try again')
            }
        })
    }


    submitAssignmentMarks = (e) => {
        e.preventDefault();
        // let data = this.state;

        // let assignment = {
        //     no:data.no,
        //     rollno:data.rollno,
        //     obtain_marks: data.obtain_marks
        // }
        fetch('/assignments_marks', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp.groupid) {
                alert('Marks Successfully Added to Roll N0 :' + resp.groupid);

            } else if (resp.err) {
                alert('Error is Occured');
            }
        })
    }

    componentDidMount(){
        if(this.props.login.loggedInUser.designation){
            console.log(this.props.loggedInUser);
            debugger;
            let data = {
                supervisorname : this.props.login.loggedInUser.name
            }
        fetch('/sup_groups_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((groups) => {
            debugger;
            if (groups) {
                this.setState({
                    groups: groups
                })

            } else {
                alert('Groups Not Found');
            }
        })
    }else{
        fetch('/admin_groups_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((groups) => {
            debugger;
            if (groups) {
                this.setState({
                    groups: groups
                })

            } else {
                alert('Groups Not Found');
            }
        })
    }
    }




    render() {
        return (
            <div className='main-c'>
                {/* style={{border: '2px solid black' }} */}
                <div className='pcontainer-editor-r' align='left' ><p id={'user-type'} className={'p-r'}><b> Upload Assignment</b></p></div>

                <div id='main_edit_assign'>
                    <form onSubmit={this.submitAssignment}>
                        <table className='tbl-result' >
                            <tbody>
                                <tr>
                                    <th className='e-a-t'>No:</th>
                                    <td ><input type='number' className='b-td' name='no' required='required' placeholder='Enter No' onChange={this.handleChange} value={this.state.no} /></td>
                                    <th className='e-a-t'>Title:</th>
                                    <td ><input type='text' className='b-td' name='title' required='required' placeholder='Enter Title' onChange={this.handleChange} value={this.state.title} /></td>
                                </tr>
                                <tr>
                                    <th className='e-a-t'>Group Id:</th>
                                    <td ><select  className='gid_select' name='groupid'  required='required'  onChange={this.handleChange} value={this.state.groupid} >
                                        <option>Please Select</option>
                                        {this.state.groups.map((group) =>{
                                            return <option>{group.groupid}</option>
                                        })}
                                        </select>
                                    </td>
                                    <th className='e-a-t'>File:</th>
                                    <td ><input type='file' className='b-td' ref='assigninput' name='file' onChange={this.pickFile} /></td>
                                    {/* <td className={'p-pic'}></td> */}
                                    {/* onChange={this.getBase64 }  */}

                                </tr>
                                <tr>
                                    <th className='e-a-t'>Due Date:</th>
                                    <td ><input type='date' className='b-td' name='due_date' required='required' placeholder='Enter Marks ' onChange={this.handleChange} value={this.state.due_date} /></td>
                                    {/* <th className='e-a-t'>Total Marks:</th>
                                    <td ><input type='number' className='b-td' name='total_marks' placeholder='Enter Total Marks ' onChange={this.handleChange} value={this.state.total_marks} /></td> */}

                                </tr>
                                <tr>
                                   

                                </tr>
                                <tr>
                                    <td >
                                        <input type='submit' className={'r-btn'} value='Publish Assignment' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

                {/* //Marks Area */}
                {/* <div id='main_edit_marks'>
                    <form onSubmit={this.submitAssignmentMarks}>
                        <table className={'tbl-result'} >
                            <tr><h4 id={'user-type'} className={'p-r'}>Add Marks</h4></tr>
                            <tbody>
                                <tr>
                                    <th>No:</th>
                                    <td className={'r-td'}><input type='numeric' name='no' required='required' placeholder='Enter No' onChange={this.handleChange} /></td>
                                </tr>
                               
                                <tr>
                                    <th>Roll No:</th>
                                    <td className={'r-td'}><input type='numeric' name='rollno' required='required' placeholder='Enter Roll No ' onChange={this.handleChange} /></td>

                                </tr>
                                <tr>
                                    <th>Obtained Marks:</th>
                                    <td className={'r-td'}><input type='numeric' name='obtain_marks' placeholder='Enter Obtained Marks ' onChange={this.handleChange} /></td>

                                </tr>
                                <tr>
                                    <td >
                                        <input type='submit' className={'r-btn'} value='Save' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div> */}






            </div>

        )
    }
};

let ConnectedAssignmentEditor = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.loginReducer
    }
})(AssignmentEditor);


export default ConnectedAssignmentEditor;

