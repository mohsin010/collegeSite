import React, { Component } from 'react';
import './result.css';
import UploadResult from './uploadresult';
import Result from './result';


class ViewResult extends Component {

  constructor(props) {
    super(props);
    this.state = { usertype: 'teacher' }
  }

  // abc = this.state.usertype;



  render() {

    // if(this.state.usertype == 'teacher' || this.state.usertype == 'admin'){
    //   return
    // }else{
    //   return 
    // }



    return <div>
        <UploadResult />
        <Result />
      </div>
    

  }
  // < Result />

}

export default ViewResult;
