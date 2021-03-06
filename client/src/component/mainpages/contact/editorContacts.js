import React, { Component } from 'react';
// import './result.css';
// import Result from './result';



class UploadContacts extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     showComponent: false,
        // };
        this.state = {
            issue: '',
            email: '',
            num: ''
        };
        this.handleChange = this.handleChange.bind(this);


    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
            
    })
}
    componentDidMount() {
        this.submitData = (e) => {
            e.preventDefault();

            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state),
            }).then((resp) => resp.json()).then((resp) => {
                if (resp.issue) {
                    fetch('/sup_document_display', {
                        method: "POST"

                    }).then((resp) => {
                        return resp.json()
                    }).then((res) => {

                        this.setState({
                            issue: '',
                            email: '',
                            num: ''
                        })

                        // store.dispatch({
                        //     type: 'assignment_uploaded',
                        //     payload: res
                        // });
                    })


                    alert('Contact Successfully Published ');

                } else {
                    this.setState({
                        issue: '',
                        email: '',
                        num: ''
                    })
                    alert('Contact Already Uploaded');
                }
            })
        }
    }



    render() {
        return (
            <div className='main-c'>
                <div className='pcontainer-editor-r' align='left' ><p id={'user-type'} className={'p-r'}><b> Upload Contacts</b></p></div>

                <form onSubmit={this.submitData}>
                    <table className={'tbl-result'} id='tbl_contacts'  >
                        <tbody>
                            <tr>
                                <th className='t-rd th_cont' >Issue:</th>
                                <td  >
                                    <input type='text' className='r-td td_cont' name='issue' required placeholder='Enter Issue Name' value={this.state.issue} onChange={this.handleChange} /></td>
                                </tr>
                                <tr>    
                                <th className='t-rd th_cont'>Email:</th>
                                <td ><input type='text' className='r-td td_cont' name='email' required placeholder='Enter Email' value={this.state.email} onChange={this.handleChange} /></td>
                            </tr>

                            <tr>
                                <th className='t-rd th_cont' >Phone:</th>
                                <td ><input type='number' className='r-td td_cont' name='num' required='required' placeholder='Enter Phone' value={this.state.num} onChange={this.handleChange} /></td>
                               
                            </tr>
                            <tr>
                                {/* <th></th> */}
                                <td >
                                    <input type='submit' className={'r-btn'} id='btn_contact' value='Save' />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </form>



            </div>

        )
    }
};



export default UploadContacts;