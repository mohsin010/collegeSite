import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './noticeboard.css';
import store from '../../../store/store';
import {connect} from 'react-redux';
import ConnectedDisplay_announce from './display_announce';
import Editor_announce from './editor_announce';


// console.log(this.props.login.loggedInUser.rollno);
class Announcement extends Component {
  
  render() {
    if (this.props.login.loggedInUser.rollno) {

      return <ConnectedDisplay_announce />;
    } else {
      return <div>
        <Editor_announce />
        <ConnectedDisplay_announce />
      </div>
    }



  }

}

let ConnectedAnnouncement = connect((store) => {

  return {
        login: store.loginReducer
  }
})(Announcement);


export default ConnectedAnnouncement;
