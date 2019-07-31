import React, { Component } from 'react';

import CustomDefaultRouts from './defaultRoutes/defaultRouts';
import Nav from './component/navbar/navbar';
import Example from './component/navbar/nav1'
import Header from '../src/component/header/header';
import Home from '../src/component/home/home';
import store from './store/store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Default extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollno: this.props.login.loggedInUser.rollno,

    }
    let user = this.props.login.loggedInUser;
    if (this.props.location.pathname == '/signup' || this.props.location.pathname == '/to_login') {
    } else {
      fetch('/st_groups_display', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(this.state)
      }).then((resp) => resp.json()).then((group) => {

        if (group) {
          this.setState({
            groupid: group.groupid,
            title: group.title,
            supervisor: group.supervisor
          })
          store.dispatch({
            payload: group,
            type: 'group_loaded'
          })
        } else {
          console.log('Not Found any Reacord')
        }

      })

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
          // if(this.props.location.pathname == '/'){
          this.props.history.push('/app');
          // }
          // else{
          //   this.props.history.push(this.props.history.location.pathname);
          // }


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
    if (this.props.login.loggedInUser.cnic) {
      return (
        <div className="default">
          <Header />
          <div hidden={!this.props.login.loggedInUser.cnic}>
            <Example />
          </div>
          {/* <div hidden={!this.props.login.loggedInUser._id}>
              <Home />
            </div> */}
          {/* <div  hidden={!this.props.login.loggedInUser._id} > */}

          <CustomDefaultRouts />
          {/* </div> */}
        </div>

      );
    }else{
      return(
        <div className="default">
          <Header />
          {/* <div hidden={!this.props.login.loggedInUser._id}>
              <Home />
            </div> */}
          {/* <div  hidden={!this.props.login.loggedInUser._id} > */}

          <CustomDefaultRouts />
          {/* </div> */}
        </div>
      )
    }

  }
}

let ConnectedDefault = connect((store) => {
  return {

    login: store.loginReducer
  }
})(withRouter(Default));

export default ConnectedDefault;
