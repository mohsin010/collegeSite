import React, { Component } from 'react';
// import './result.css';
import Result from './result';



class UploadResult extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     showComponent: false,
        // };
        this.state = {
            components: [

            ],
            rollno: '',
            groupId: '',
            marks: '',
            grade: '',
        };
        this.handleChange = this.handleChange.bind(this);


    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value.toUpperCase(),
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value.toUpperCase()
        })
    }
    componentDidMount() {
        this.submitData = (e) => {
            e.preventDefault();

            fetch('/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state),
            }).then((resp) => resp.json()).then((resp) => {
                if (resp.rollno) {
                    fetch('/sup_document_display', {
                        method: "POST"

                    }).then((resp) => {
                        return resp.json()
                    }).then((res) => {

                        this.setState({
                            rollno: '',
                            groupId: '',
                            marks: '',
                            grade: '',
                        })

                        // store.dispatch({
                        //     type: 'assignment_uploaded',
                        //     payload: res
                        // });
                    })


                    alert('Result Successfully Published ');

                } else {
                    this.setState({
                        rollno: '',
                        groupId: '',
                        marks: '',
                        grade: '',
                    })
                    alert('Result Already Uploaded');
                }
            })
        }
    }



    render() {

       
        return (
            <div className='main-c'>
                <div className='pcontainer-editor-r' align='left' ><p id={'user-type'} className={'p-r'}><b> Upload Result</b></p></div>

                <form onSubmit={this.submitData}> 
                    <table className={'tbl-result'} >
                        <tbody>
                            <tr>
                                <th className='t-rd' >Roll No:</th>
                                <td  >
                                    <input type='numeric' className='r-td' name='rollno' required='required'  placeholder='Enter Roll no' value={this.state.rollno} onChange={this.handleChange} /></td>
                                    
                                </tr>
                                <tr>
                                <th className='t-rd'>Group ID:</th>
                                <td ><input type='text' className='r-td' name='groupId' required='required' placeholder='Enter Group ID' value={this.state.groupId} onChange={this.handleChange} /></td>
                            </tr>

                            <tr>
                                <th className='t-rd' >Marks:</th>
                                <td ><input type='number' className='r-td' name='marks' required='required' placeholder='Enter Marks' value={this.state.marks} onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                <th className='t-rd'>Grade:</th>
                                <td ><input type='text' className='r-td' name='grade' required='required' placeholder='Enter Grade' value={this.state.grade} onChange={this.handleChange} /></td>

                            </tr>
                            <tr>
                                <td >
                                    <input type='submit' className={'r-btn'} id='btnsub_r' value='Save' />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </form>



            </div>

        )
    }
};



export default UploadResult;