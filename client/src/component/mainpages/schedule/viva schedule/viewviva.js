import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './viva.css';
import  Viva from './viva';

// const style = {
//   backgroundColor:'red',
//   width: '90px'
// }

class ViewViva extends Component {
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
      
          <Viva />
        
    );
  }
}

export default ViewViva;
