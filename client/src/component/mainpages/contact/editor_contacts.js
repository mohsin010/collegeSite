import React, { Component } from 'react';
// import './result.css';
import ConnectedDisplay_contacts from './contact';
import UploadContacts from './editorContacts';
import {connect} from 'react-redux';


class editor_contacts extends Component {

  constructor(props) {
    super(props);
  }




  render() {

    // if (this.props.login.loggedInUser.rollno) {
    //   return <ResultTable />
    // } else {
      return <div>
        {/* <div hidden={!this.props.login.loggedInUser.department || this.props.login.loggedInUser.department }> */}

        {/* </div> */}
        {/* <UploadContacts  /> */}
        <ConnectedDisplay_contacts />

      </div>
    }
//   }

}
let Connectededitor_contacts = connect((store) => {

  return {
        login: store.loginReducer
  }
})(editor_contacts);


export default Connectededitor_contacts;

