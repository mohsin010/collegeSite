import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './noticeboard.css';
import store from '../../../store/store';
import {connect} from 'react-redux';
import ConnectedDisplay_notic from './display_notice';
import Editor from './editor';


// console.log(this.props.login.loggedInUser.rollno);
class Noticeboard extends Component {
  
  render() {
    if (this.props.login.loggedInUser.rollno) {

      return <ConnectedDisplay_notic />;
    } else {
      return <div>
        <Editor />
        <ConnectedDisplay_notic />
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
