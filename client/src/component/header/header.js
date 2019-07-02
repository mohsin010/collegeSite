import React, { Component } from 'react';
import './header.css'
import PMS from '../../data/icon.jpg';
import { Link } from 'react-router-dom';
import store from '../../store/store';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

// import style from



class Header extends Component {
  constructor(props) {
    super(props)
  }

  auth = (props) => {
    let pathname = this.props.location.pathname;


    fetch('/is_authenticated', {
      method: 'GET'
    }).then((resp) => resp.json()).then((resp) => {
      if (resp.cnic) {
        store.dispatch({
          payload: resp,
          type: 'user_signed_success'
        })
        this.props.history.push('/app');
      } else {

        this.props.history.push('/');

      }

      // else{
      //   this.props.history.push('/app');
      // }
    })
  }

  render() {
    return (
      <div id='head-main-c'>
        <div className={'header'} id={'header'}>
          <div >
            <img id={'logo-pms'} src={PMS} onClick={this.auth} />
          </div>

          <div id={'title-div'}>
            <h3 id={'title'} ><span onClick={this.auth}>PROJECT MANAGEMENT SYSTEM</span></h3>
          </div>
          <div >
          <span id='username_' hidden={!this.props.login.loggedInUser.name}>{this.props.login.loggedInUser.name} ({this.props.login.loggedInUser.cnic})</span>
          </div>

        </div>
      </div>
    )
  }

}

let ConnectedHeader = connect((store) => {

  return {
      login: store.loginReducer,
      assignments: store.loginReducer
  }
})(Header);


export default withRouter(ConnectedHeader);



