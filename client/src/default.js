import React, { Component } from 'react';

import CustomDefaultRouts from './defaultRoutes/defaultRouts';
import Nav from './component/navbar/navbar';
import Header from '../src/component/header/header';
import Home from '../src/component/home/home';
import store from './store/store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Default extends Component {
  constructor(props) {
    super(props);
    let user = this.props.login.loggedInUser;
    if (this.props.location.pathname == '/signup' || this.props.location.pathname == '/to_login') {
    } else {

      fetch('/is_authenticated', {
        method: 'GET',
        // headers:{
        //   'Content-Type': 'Application/json'

        // },
        // body: this.user
      }).then((resp) => resp.json()).then((resp) => {
        if (resp.cnic) {
          store.dispatch({
            payload: resp,
            type: 'user_signed_success'
          })
          
          this.props.history.push(this.props.history.location.pathname);


        } else {

          this.props.history.push('/');

        }

        // else{
        //   this.props.history.push('/app');
        // }
      })
     
    }
  }
  render() {
    return (
      <div className="default">
        <Header />
        <div hidden={!this.props.login.loggedInUser.cnic}>
          <Nav />
        </div>
        {/* <div hidden={!this.props.login.loggedInUser._id}>
            <Home />
          </div> */}
        {/* <div  hidden={!this.props.login.loggedInUser._id} > */}

        <CustomDefaultRouts />
        {/* </div> */}
      </div>

    );
  }
}

let ConnectedDefault = connect((store) => {
  return {

    login: store.loginReducer
  }
})(withRouter(Default));

export default ConnectedDefault;
