import React, { Component } from 'react';
// import './result.css';
import Assignment from './assignment';
import CreateAssignment from './display_assignment';



class AssignmentEditor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            no: '',
            title: '',
            topic: '',
            due_date: '',
            rollno: '',
            file: '',
            total_marks: '',
            obtain_marks: ''
        };
        console.log(this.state.no);

        this.handleChange = this.handleChange.bind(this);
        this.submitAssignmentMarks = this.submitAssignmentMarks.bind(this)



    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,


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
        formData.append('rollno', data.rollno);
        formData.append('file', data.file)
        formData.append('total_marks', data.total_marks)
        let marks = {
            assigment:{
                rollno: data.rollno,
                no: data.no,
                obtain_marks: data.obtain_marks
            }
        }
        fetch('/assignments', {
            method: 'POST',
            body: formData, 
        }).then((resp) => resp.json()).then((resp) => {
            if (resp.rollno) {
                alert('Assignment Successfully Published to :' + resp.rollno);

            } else if (resp.err) {
                alert('Error is Occured');
            }
        })
    }
    submitAssignmentMarks =(e) =>{
        e.preventDefault();
        // let data = this.state;
        
        // let assignment = {
        //     no:data.no,
        //     rollno:data.rollno,
        //     obtain_marks: data.obtain_marks
        // }
        fetch('/assignments_marks', {
            method: 'POST',
            headers:{
                'Content-Type': 'Application/Json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((resp) => {
            if (resp.rollno) {
                alert('Marks Successfully Added to Roll N0 :' + resp.rollno);

            } else if (resp.err) {
                alert('Error is Occured');
            }
        })
    }

    



    render() {
        return (
            <div className='main-c'>
                <div style={{border: '2px solid black' }} id='main_edit_assign'>
                    <form onSubmit={this.submitAssignment}>
                        <table className={'tbl-result'} >
                            <tr><h4 id={'user-type'} className={'p-r'}>Upload Assignment</h4></tr>
                            <tbody>
                                <tr>
                                    <th>No:</th>
                                    <td className={'r-td'}><input type='numeric' name='no' required='required' placeholder='Enter No' onChange={this.handleChange} /></td>
                                    <th>Title:</th>
                                    <td className={'r-td'}><input type='text' name='title' required='required' placeholder='Enter Title' onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <th>Topic:</th>
                                    <td className={'r-td'}><input type='text' name='topic' required='required' placeholder='Enter Topic Name ' onChange={this.handleChange} /></td>
                                    <th>File:</th>
                                    <td className={'r-td'}><input type='file' name='file' onChange={this.pickFile} placeholder='Enter Group ID' /></td>
                                    {/* <td className={'p-pic'}></td> */}
                                    {/* onChange={this.getBase64 }  */}

                                </tr>
                                <tr>
                                    <th>Due Date:</th>
                                    <td className={'r-td'}><input type='date' name='due_date' required='required' placeholder='Enter Marks ' onChange={this.handleChange} /></td>
                                    <th>Roll No:</th>
                                    <td className={'r-td'}><input type='numeric' name='rollno' required='required' placeholder='Enter Roll No ' onChange={this.handleChange} /></td>

                                </tr>
                                <tr>
                                    <th>Total Marks:</th>
                                    <td className={'r-td'}><input type='numeric' name='total_marks' placeholder='Enter Total Marks ' onChange={this.handleChange} /></td>
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
                </div>

                {/* //Marks Area */}
                <div id='main_edit_marks'>
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
                </div>

           




            </div>

        )
        }
};



export default AssignmentEditor;