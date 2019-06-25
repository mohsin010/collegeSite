import React, { Component } from 'react';
import './document.css';
import  Document from './document';


class ViewDocument extends Component {
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
          <Document />
    );
  }
}

export default ViewDocument;
