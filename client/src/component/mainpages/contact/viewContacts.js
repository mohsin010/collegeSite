import React, { Component } from 'react';
// import './result.css';
import ConnectedDisplay_contacts from './contact';
import UploadContacts from './editorContacts';
import {connect} from 'react-redux';


class ViewContacs extends Component {

  constructor(props) {
    super(props);
  }




  render() {

    // if (this.props.login.loggedInUser.rollno) {
    //   return <ResultTable />
    // } else {
      return <div>
        <UploadContacts />
        <ConnectedDisplay_contacts />

      </div>
    }
//   }

}
let ConnectedViewContacs = connect((store) => {

  return {
        login: store.loginReducer
  }
})(ViewContacs);


export default ConnectedViewContacs;

