import './discussion.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Post_msg
import post from '../../../data/postmsg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'







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
    viewMsg = (msg) => {
        if (this.state.selected == null) {
            this.setState({
                selected: msg
                // display: true
            })

        } else {
            this.setState({
                selected: null
            })

        }

    }

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
                    <div id='post_btn_container'><Link to='/post_msg'><img src={post} id='post_btn' title='Post Message' /></Link></div>
                    <div id='msg_list_container'>
                        <div className='pcontainer' id='msg_list' align='left' ><span className='ptitle'>Messages List</span></div>
                        <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Message Yet</span></div>
                        <div>
                            <table id='tbl_msgs'>
                                <tr id='th_msg'>
                                    <th>ID</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                </tr>
                                {this.state.msgs.map((msg) => {

                                    return <>
                                        <tr className='tr_msg'>
                                            <td className='td_msg1' id='td_msg_sub'> <span id='td_msg_sub_span' onClick={this.viewMsg.bind(this, msg)}><FontAwesomeIcon icon={faPlusSquare} className={(msg == this.state.selected) ? "hide" : "tr_msg"} /><FontAwesomeIcon icon={faMinusSquare} className={(msg == this.state.selected) ? "tr_msg" : "hide"} />Msg No :{msg.msgid} </span></td>
                                            <td className='td_msg1' className='td_msg'>{msg.subject}</td>
                                            <td className='td_msg1'>{msg.posttime}</td>


                                        </tr>
                                        <tr className={(msg == this.state.selected) ? "tr_ms trmsg" : "hide"}>
                                            <td className='msg_rep_tim'>
                                                <span  >{msg.replytime}</span>
                                            </td>
                                            <td colSpan='2'>{msg.body}</td>


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

export default Discussion;
