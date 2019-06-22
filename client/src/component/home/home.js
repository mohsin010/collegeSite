import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import btn_info from '../../data/btn_info.png';
import btn_assignments from '../../data/btn_assignments.png';
import btn_MDB from '../../data/btn_MDB.png';
import btn_Announcements from '../../data/btn_Announcements.png';



class Home extends Component {
    render() {
        return (
            <div id='flex-main-container'> 
                <h4 align='left' id='flex-heading'>Group ID</h4>

                <div class="flex-container" id='btn_info_conatainer'>
                    <div><Link to='/app/instructor'><img src={btn_info} className='btn_image' id='btn_info' />  </Link>
                        <p className='description' id='btn_info-dec'>Supervisor Info</p>
                    </div>
                    <div><Link to='/app/assignment'><img src={btn_assignments} className='btn_image' />  </Link>
                        <p className='description'>Assignments</p>
                    </div>
                    <div><Link to='/app/discussion'><img src={btn_MDB} className='btn_image' />  </Link>
                        <p className='description'>Discussion</p>
                    </div>
                    <div><Link to='/app/announcements'><img src={btn_Announcements} className='btn_image' />  </Link>
                         <p className='description'>Announcements</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
