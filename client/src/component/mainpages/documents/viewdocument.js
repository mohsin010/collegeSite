import React, { Component } from 'react';
import './document.css';
import Editor_document from './editor_document';
import ConnectedAssignmentDisplay from './uploaddocument';
import { connect } from "react-redux";


class ViewDocument extends Component {



  render() {
    if (this.props.login.loggedInUser.rollno) {
      return <ConnectedAssignmentDisplay />
    } else {
      return <div>
        <Editor_document />
        <ConnectedAssignmentDisplay />

      </div>
    }
  }



}
let ConnectedViewDocument = connect((store) => {

  return {
        login: store.loginReducer
  }
})(ViewDocument);


export default ConnectedViewDocument;

