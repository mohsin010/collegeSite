import React, { Component } from 'react';
import {connect} from 'react-redux';
import './result.css';
import AssignmentEditor from './editor_assignment';
import AssignmentDisplay from './display_assignment';


class ViewAssignment extends Component {

  constructor(props) {
    super(props);
    this.state = {usertype: 'teacher'}
  }
   
  // abc = this.state.usertype;
    

  
    render() {
      
      if(this.props.login.loggedInUser.rollno){
          return <AssignmentDisplay  />
      }else{
          return <div>
          <AssignmentEditor />
          <AssignmentDisplay  />
          </div>
        
      }
     

  }

}
let ConnectedViewAssignment = connect((store) => {

  return {
        login: store.loginReducer
  }
})(ViewAssignment);


export default ConnectedViewAssignment;

