import React, { Component } from 'react';
import './contact.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';



class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      issue: '',
      email: '',
      num: '',  
      display1: 'none',
      display2: 'none',
    };


  }

  deleteContact = (contacts, evt) => {


    let data = {

        issue: contacts.issue,
    }
    fetch('/delete_contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resp) => resp.json()).then((resp) => {
        debugger;
        if (resp) {

            let target = this.state.contacts.find((contact) => {
                return resp._id == contact._id;
            })

            let index = this.state.contacts.indexOf(target)


            this.state.contacts.splice(index, 1)
            this.setState({
              contacts: this.state.contacts

            })
            alert('Contact Deleted Successfully')


        } else {
            alert('Error is Occured');
        }

    });
}
  render() {
    debugger;
    

      debugger;
      fetch('/contacts_display', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(this.state)
      }).then((resp) => resp.json()).then((contacts) => {

        // assignments = assignments.sort((prev, next) => {
        //     return prev.rollno - next.rollno;
        // })

        if (contacts) {
          debugger;
          this.setState({
            // selected: null,
            
            contacts: contacts,
            display1: 'block',
          });
        } else {
          this.setState({ display2: 'block' })
        }
      })
    
    return (
      <div>
        <div id='msg_disp_container' className='cont_disp_cont'>
          <div className='pcontainer' align='left' ><span className='ptitle'>Important Contacts</span></div>
          <div id='msg_list_container'>
            {/* <div className='pcontainer' id='msg_list' align='left' ><span className='ptitle'>Messages List</span></div> */}
            {/* <div id='nn_Assignment' style={{ display: this.state.display2 }} ><span>No Message Yet</span></div> */}
            <table id='tbl_msgs'>
              <tr id='th_msg' className='th_cont'>
                <th className='td_head_1'>Isue</th>
                <th className='th_email'>Email</th>
                <th className='th_phone'>Phone No</th>
                <th hidden={!this.props.login.loggedInUser.cnic || this.props.login.loggedInUser.cnic }>Delete</th>
              </tr>
              {this.state.contacts.map((contact) => {

                return <>
                  <tr className='tr_msg'>
                    <td className='td_cont_issu' >
                      {contact.issue} </td>
                    <td className='td_cont' >{contact.email}</td>
                    <td className='td_cont'>{contact.num}</td>
                    <td  hidden={!this.props.login.loggedInUser.cnic || this.props.login.loggedInUser.cnic }>
                      <button className='btnn-del' title='delete'  onClick={this.deleteContact.bind(this, contact)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                    {/* hidden={this.props.login.loggedInUser.rollno} */}

                  </tr>
                </>
              })}
            </table>
          </div>
        </div>
      </div>
      // </div >
    );
  }
}

let ConnectedDisplay_contacts = connect((store) => {

  return {
      login: store.loginReducer,
      assignments: store.login

  }
})(Contacts);


export default ConnectedDisplay_contacts;

