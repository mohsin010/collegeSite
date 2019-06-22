import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../viva schedule/viva.css';
import  Meeting from './meeting';


class ViewMeeting extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     title: ''
  //   }
  //   console.log(this.state);
  //   this.generateNotification = this.generateNotification.bind(this);
  // } 

  // generateNotification(evt){
    
  //   this.setState({
  //     title: evt.target.value
  //   })
  // }


  render() {
    return (
          <Meeting />
    );
  }
}

export default ViewMeeting;
