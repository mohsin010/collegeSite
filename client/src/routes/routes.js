// import Signin from './component/mainpages/signin';
// import Header from './component/header/header';
import App from '../App';
import Nav from '../component/navbar/navbar';
import Home from '../component/home/home'
import Profile from '../component/mainpages/profile/Profile';
import Noticeboard from '../component/mainpages/noticeboard/viewnoticeboard';
import Editor from '../component/mainpages/noticeboard/editor';
import ViewDocument from '../component/mainpages/documents/viewdocument';
import ViewResult from '../component/mainpages/result/viewresult';
import Schedule from '../component/mainpages/schedule/mainschedule';
import Meeting from '../component/mainpages/schedule/meeting schedule/meeting';
import Viva from '../component/mainpages/schedule/viva schedule/viva';
import Instructor_Info from '../component/mainpages/instructor_info/instructor_info';
import ViewAssignment from '../component/mainpages/assignment/view_assignment';

// import Profile from './component/mainpages/profile/Profile';

import React, { Component } from 'react';
import {
     BrowserRouter as   Router ,
    Route
} from 'react-router-dom';

const CustomRoutes = () => (
    <Router>
        <Nav />
        
        <Route exact path='/app' component={Home} />

        <Route  path='/profile' component={Profile} />

        <Route path='/noticeboard' component={Noticeboard} />

        {/* <Route path='/noticboard' component={Editor} /> */}


        <Route path='/documents' component={ViewDocument} />

        <Route path='/result' component={ViewResult} />

        <Route path='/schedule' component={Schedule} />

        <Route path='/schedule/meeting' component={Meeting} />

        <Route path='/schedule/viva' component={Viva} />
        
        <Route path='/instructor' component={Instructor_Info} />

        <Route path='/assignment' component={ViewAssignment} />







    </Router>

)


export default CustomRoutes;