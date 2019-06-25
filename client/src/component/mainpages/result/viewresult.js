import React, { Component } from 'react';
import './result.css';
import UploadResult from './uploadresult';
import ResultTable from './resulttable';
import {connect} from 'react-redux';


class ViewResult extends Component {

  constructor(props) {
    super(props);
    this.state = { usertype: 'teacher' }
  }

  // abc = this.state.usertype;



  render() {

    if (this.props.login.loggedInUser.rollno) {
      return <ResultTable />
    } else {
      return <div>
        <UploadResult />
        <ResultTable />

      </div>
    }
  }

}
let ConnectedViewResult = connect((store) => {

  return {
        login: store.loginReducer
  }
})(ViewResult);


export default ConnectedViewResult;

