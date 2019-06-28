import './discussion.css';
import React, { Component } from 'react'
import{Link} from 'react-router-dom';
import post from '../../../data/cancel.png';

import { connect } from 'react-redux';
import { get } from 'mongoose';








class Post_Msg extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groupid: '',
            supid: '',
            rollno: '',
            msgid: this.id(),
            subject: '',
            body: '',
            posttime: new Date().toLocaleString(),
            replytime: '',
            supreply: ''
        }



    }

    id = () => {

        this.date = new Date();
        this.components = [
            this.date.getYear(),
            this.date.getMonth(),
            this.date.getDate(),
            this.date.getHours(),
            this.date.getMinutes(),
            this.date.getSeconds(),
        ];

        this.id = this.components.join("");
        return this.id;
    }

    changeHandler = (evt, arg) => {

        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,


        })


        // console.log(this.editor.getData());
        console.log(this.state);

    }
    submitData = (e) => {
        e.preventDefault();
        // if (this.state.title == '' && this.state.body == '') {
        //     this.setState({
        //         titleerr: true,
        //         bodyerr: true
        //     })
        //     alert("Please Fill Red Borderd Fields")
        // } else if (this.state.title == '') {
        //     this.setState({
        //         titleerr: true
        //     })
        //     alert("Please Fill Title Field")
        // } else if (this.state.body == '') {
        //     this.setState({

        //         bodyerr: true
        //     })
        //     alert("Please Fill Body Field")

        // } else {

        fetch('/post_msg', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state),
        }).then((resp) => resp.json()).then((resp) => {

            if (resp._id) {

                this.setState({
                    subject: '',
                    body: ''

                })


                alert('Message Successfully Send ');

            } else {
                this.setState({
                    subject: '',
                    body: ''

                })
                alert('Please try again');
            }
        })
    }
    // }

    render() {
        return (
            <div id='msg_container_main'>
                <div>
                    <div className='pcontainer' align='left' ><span className='ptitle'>Announcement</span></div>
                    <div id='msg_container'>
                        <form onSubmit={this.submitData}>
                            <label className='label_msg'>Subject</label>
                            <input id='msg_subject' type='text' name='subject' required='required' value={this.state.subject} onChange={this.changeHandler} />
                            <br />
                            <label id='label_msg' className='label_msg'>Message</label>
                            <textarea id='msg_textarea' name="body" rows="10" cols="73.99" style={{ borderColor: this.state.bodyerr ? 'red' : 'inherit' }} required value={this.state.body} onChange={this.changeHandler} />
                            <br />
                            <div id='msg_controler'>
                                <input id='msg_post' className='msg_control' type='submit' name='postmsg' value='' />

                                <Link to ='/app/discussion' ><img src={post} id='msg_cancel' className='msg_control'  /> </Link> 
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        )
    }
}
export default Post_Msg;