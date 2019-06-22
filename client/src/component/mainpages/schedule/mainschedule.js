import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Meeting from './meeting schedule/meeting'
import './mainschedule.css'




class Schedule extends Component {

    render() {
        return (
            <div id='main-sc'>
                <div>
                    <ul id='schedule'>
                        <li><Link className="" to="/schedule/meeting">Meeting Schedule</Link></li>
                        <li><Link className='' to="/schedule/viva">Viva Schedule</Link></li>
                    </ul>

                    
                </div>
            </div>
        )
    }
}

export default Schedule ;