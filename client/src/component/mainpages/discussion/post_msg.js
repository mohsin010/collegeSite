import './discussion.css';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import post from '../../../data/cancel.png';

import { connect } from 'react-redux';
import { get } from 'mongoose';








class Post_Msg extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groupid: '',
            supervisorname: '',
            // rollno: '',
            msgid: this.id(),
            subject: '',
            body: '',
            posttime: '',
            replytime: '',
            supreply: '',
            to: '',
            titleerr: false,
            bodyerr: true,
            required: false
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
    change = (e) =>{
        this.setState({
            [e.target.name] : e.target.value

        })
    }

    changeHandler = (evt, arg) => {
        if (this.props.login.loggedInUser.rollno) {

            debugger;
            console.log(this.props.login);
            this.setState({
                posttime: new Date().toLocaleString(),
                [evt.target.name]: evt.target.value,
                [evt.target.name]: evt.target.value,
                [evt.target.name]: evt.target.value,
                [evt.target.name]: evt.target.value,
                // to:evt.target.value,
                groupid: this.props.group.group.groupid,
                supervisorname: this.props.group.group.supervisor,


            })
        }
        else {
            // console.log(this.props.mId.messageId);
            this.setState({
                // msgid: this.props.mId.messageId,
                supreply: evt.target.value,
                // replytime: new Date().toLocaleString()
            })
        }

    }
    componentDidMount() {

        this.submitData = (e) => {
            e.preventDefault();
            // if (this.state.supreply == '') {
            //     this.setState({
            //         // titleerr: true,
            //         bodyerr: true
            //     })
            //     // alert("Please Fill Red Borderd Fields")
            // }else  {
            //     this.setState({

            //         bodyerr: false
            //     })
            //     // alert("Please Fill Body Field")

            // } 

            if (this.props.login.loggedInUser.rollno) {
                debugger;
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
            } else {
                this.data = {
                    msgid: this.props.mId.messageId,
                    supreply: this.state.supreply,
                    to: this.state.to,
                    replytime: new Date().toLocaleString()
                };

                fetch('/sup_post_msg', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify(this.data),
                }).then((resp) => resp.json()).then((resp) => {
                    debugger;
                    if (resp.msgid) {

                        this.setState({
                            supreply: ''

                        })

                        this.props.history.push('/app/discussion');


                        alert('Message Successfully Replied ');

                    } else {
                        this.setState({
                            supreply: ''

                        })
                        alert('Please try again');
                    }
                })
            }
        }
    }
    // }


    render() {
        return (
            <div id='msg_container_main'>
                <div>
                    <div className='pcontainer' align='left' ><span className='ptitle'>Message Editor</span></div>
                    <div id='msg_container'>
                        <form onSubmit={this.submitData}>
                            <label hidden={!this.props.login.loggedInUser.rollno} className='label_msg'>Subject</label>

                            <input hidden={!this.props.login.loggedInUser.rollno} className='msg_subject'
                                type='text' name='subject' required={this.props.login.loggedInUser.rollno ? 'required' : false}
                                value={this.state.subject} onChange={this.changeHandler}
                                style={{ borderColor: this.state.titleerr ? 'red' : 'inherit' }} />

                            <label hidden={this.props.login.loggedInUser.rollno} className='label_msg'>To</label>

                            <input hidden={this.props.login.loggedInUser.rollno} className='msg_subject'
                                id='to' type='text' name='to' placeholder='eg: Dear Student,'
                                required= {!this.props.login.loggedInUser.rollno ? 'required' : false} 
                                value={this.state.to} onChange={this.change}
                                style={{ borderColor: this.state.titleerr ? 'red' : 'inherit' }} />
                            
                            <br />
                            <label id='label_msg' className='label_msg'>Message</label>
                            <textarea id='msg_textarea' name="body" rows="10" cols="73.99" style={{ borderColor: this.state.bodyerr ? 'red' : 'inherit' }} required value={this.state.body || this.state.supreply} onChange={this.changeHandler} />
                            <br />
                            <div id='msg_controler'>
                                <input id='msg_post' className='msg_control' type='submit' name='postmsg' value='' />

                                <Link to='/app/discussion' ><img src={post} id='msg_cancel' className='msg_control' /> </Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        )
    }
}

let ConnectedPostMsg = connect((store) => {
    debugger;
    return {
        login: store.loginReducer,
        assignments: store.login,
        mId: store.loginReducer,
        group: store.loginReducer

    }
})(Post_Msg);


export default ConnectedPostMsg;
