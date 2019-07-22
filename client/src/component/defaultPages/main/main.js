import React, { Component } from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import Signin from '../../mainpages/signin/signin';
import SignUp from '../../mainpages/signup/signup';
class DefaultMain extends Component {
    render() {
        return ( 
            <div>
                <div className={'main-container'} >

                    <div className={'submain-container'}>
                    <div id='list-d-v'>

                    </div>
                        <div id={'list-d'}>
                            <ul id='linkul-d'>
                                <li className='signli'>
                                    <Link to='/notices'>
                                        Notice Board
                        </Link>
                                </li>
                                <li className='signli'>
                                    <Link to='/supervisorsList'>
                                        Supervisors List
                        </Link>
                                </li>
                                <li className='signli'>
                                    <Link to='/Contacts'>
                                        Contacts
                        </Link>
                                </li>
                            </ul>
                        </div> 
                        <div className={'signin'}> 
                            <Signin />
                            <span class={'anchor'} id={'anchor5'} >Or</span>
                        <br></br>
                        <Link to="/signup" class={'anchor'} id={'anchor3'}>SignUp!</Link>
                        </div>

                    </div>
 
                </div>
            </div>
        )
    }

}

export default DefaultMain;