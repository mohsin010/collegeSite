import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './noticeboard.css';
import store from '../../../store/store';
import {connect} from 'react-redux';
import Notice from './notice';
import Editor from './editor';


// console.log(this.props.login.loggedInUser.rollno);
class Noticeboard extends Component {
  
  render() {
    debugger;
    if (this.props.login.loggedInUser.rollno) {

      return <Notice />;
    } else {
      return <div>
        <Editor />
        <Notice />
      </div>
    }



  }

}

let ConnectedNoticboard = connect((store) => {

  return {
        login: store.loginReducer
  }
})(Noticeboard);


export default ConnectedNoticboard;
