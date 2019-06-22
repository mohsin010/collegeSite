import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';

import App from '../App';
import DefaultMain from '../component/defaultPages/main/main';
import Supervisors from '../component/mainpages/supervisors/viewSup/supervisors';
import Contacts from '../component/mainpages/contact/contact';
import Signup from '../component/mainpages/signup/signup';
// import Noticeboard from '../component/mainpages/noticeboard/viewnoticeboard';
import Notice from './../component/mainpages/noticeboard/notice';

import Home from '../component/home/home'
import Profile from '../component/mainpages/profile/Profile';
import Noticeboard from '../component/mainpages/noticeboard/viewnoticeboard';
import ViewDocument from '../component/mainpages/documents/viewdocument';
import ViewResult from '../component/mainpages/result/viewresult';
import Schedule from '../component/mainpages/schedule/mainschedule';
import Meeting from '../component/mainpages/schedule/meeting schedule/meeting';
import Viva from '../component/mainpages/schedule/viva schedule/viva';
import Instructor_Info from '../component/mainpages/instructor_info/instructor_info';
import ViewAssignment from '../component/mainpages/assignment/view_assignment';
import RedirectLogin from '../component/mainpages/signup/to_login';
import logOut from '../component/mainpages/signout/signout';
import { connect } from 'react-redux';




const CustomDefaultRouts = (props) => (
  <>
    {/* <Route path='/' component={Header} /> */}

    <Route exact path='/' component={DefaultMain} />
    {/* <Route path='/' component={Defaultheader} /> */}
    {/* <div hidden={props.login.loggedInUser._id}> */}
      <Route exact path='/app' component={App} />
      {/* <Route path='/app' component={Nav} /> */}
      <Route path='/app' component={Home} />

      {/* <Route path='/noticeboard' component={Notice} /> */}
      <Route path='/supervisorsList' component={Supervisors} />
      <Route path='/Contacts' component={Contacts} />
      <Route path='/signup' component={Signup} />
      <Route path='/profile' component={Profile} />
      <Route path='/noticeboard' component={Noticeboard} />
      <Route path='/notices' component={Notice} />
      <Route path='/documents' component={ViewDocument} />
      <Route path='/result' component={ViewResult} />
      <Route path='/schedule' component={Schedule} />
      <Route path='/schedule/meeting' component={Meeting} />
      <Route path='/schedule/viva' component={Viva} />
      <Route path='/app/instructor' component={Instructor_Info} />
      <Route path='/app/assignment' component={ViewAssignment} />
      <Route path='/to_login' component={RedirectLogin} />
      {/* <Route path='/to_login' component={logOut} /> */}
    {/* </div> */}

  </>
)

let ConnectedDefault = connect((store) => {

  return {
    login: store.loginReducer
  }
})(CustomDefaultRouts);

export default ConnectedDefault;