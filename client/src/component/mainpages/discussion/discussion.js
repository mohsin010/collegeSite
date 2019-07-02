import './discussion.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../../store/store';
import post from '../../../data/postmsg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';







class Discussion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msgs: [],
            display1: 'none',
            display2: 'none',
            // display:false 
        };

        this.submitData();
    }

    deleteAssignment = (msg, evt) => {


        let data = {

            msgid: msg.msgid,
        }

        fetch('/delete_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((resp) => {
            debugger;
            if (resp) {

                let target = this.state.msgs.find((msg) => {
                    return resp._id == msg._id;
                })

                let index = this.state.msgs.indexOf(target)


                this.state.msgs.splice(index, 1)
                this.setState({
                    msgs: this.state.msgs
                })
                alert('Message Deleted Successfully')


            } else {
                alert('Error is Occured');
            }

        });
    }


    viewMsg = (msg) => {
        store.dispatch({
            payload: msg.msgid,
            type: 'message_reply'
        })

        // console.log(msg.msgid);
        // if (this.state.selected == null) {
        this.setState({
            selected: msg
            // display: true
        })

        // } else {
        if (this.state.selected && this.state.selected._id == msg._id) {
            this.setState({
                selected: null
            })
        }

        //}

    }
    // 03213492509
    submitData = () => {


        fetch('/msg_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((msgs) => {

            // assignments = assignments.sort((prev, next) => {
            //     return prev.rollno - next.rollno;
            // })

            if (msgs) {
                this.setState({
                    selected: null,
                    msgs: msgs,
                    display1: 'block',
                });
            } else {
                this.setState({ display2: 'block' })
            }
        })
    }


    render() {
        return (
            <div>
                <div id='msg_disp_container'>
                    <div className='pcontainer' align='left' ><span className='ptitle'>Discussions</span></div>
                    <div id='post_btn_container' hidden={!this.props.login.loggedInUser.rollno}><Link to='/post_msg'><img src={post} id='post_btn' title='Post Message' /></Link></div>
                    <div id='msg_list_container'>
                        <div className='pcontainer' id='msg_list' align='left' ><span className='ptitle'>Messages List</span></div>
                        <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Message Yet</span></div>
                        <div>
                            <table id='tbl_msgs'>
                                <tr id='th_msg'>
                                    <th className='td_head_1'>ID</th>
                                    <th className='td_head_2'>Subject</th>
                                    <th className='td_head_3'>Date</th>
                                    <th className='td_head_3'>Delete</th>

                                </tr>
                                {this.state.msgs.map((msg) => {

                                    return <>
                                        <tr className='tr_msg'>
                                            <td className='td_msg1' id='td_msg_sub'> <span id='td_msg_sub_span'
                                                onClick={this.viewMsg.bind(this, msg)}>
                                                <FontAwesomeIcon icon={faPlusSquare} className={(msg == this.state.selected) ? "hide" : "tr_msg"} />
                                                <FontAwesomeIcon icon={faMinusSquare} className={(msg == this.state.selected) ? "tr_msg" : "hide"} />
                                                Msg No :{msg.msgid} </span></td>
                                            <td className='td_msg1' className='td_msg'>{msg.subject}</td>
                                            <td className='td_msg1'>{msg.posttime}</td>
                                            <td>
                                                <button className='btnn-del' title='delete' hidden={this.props.login.loggedInUser.rollno} onClick={this.deleteAssignment.bind(this, msg)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>


                                        </tr>
                                        <tr className={(msg == this.state.selected) ? "tr_ms trmsg" : "hide"}>
                                            <td className='msg_rep_tim'>
                                                <span  >{msg.replytime}</span>
                                            </td>
                                            <td colSpan='2'>
                                                <h4 className='heading_msg' >Student Message :</h4>
                                                <br />

                                                <span className='body_msg1' >{msg.body} </span>
                                                <div className='instruct_rep'>
                                                    <Link to='/post_msg' > <span>Reply</span> </Link>
                                                </div>
                                                <hr className='msg_hr' />
                                                <span className='sup_rep_head' >Supervisor Reply :</span>
                                                <br />
                                                <span className='to'>{msg.to}</span>
                                                <br></br>
                                                <span className='sup_rep_body'>{msg.supreply}</span>

                                            </td>


                                        </tr>
                                    </>

                                })}

                            </table>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


let ConnectedDiscussion = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Discussion);


export default ConnectedDiscussion;
