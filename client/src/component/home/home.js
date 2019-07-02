import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { connect } from 'react-redux';
import btn_info from '../../data/btn_info.png';
import btn_assignments from '../../data/btn_assignments.png';
import btn_MDB from '../../data/btn_MDB.png';
import btn_Announcements from '../../data/btn_Announcements.png';
import btn_group from '../../data/btn_groups.png';



class Home_Comp extends Component {
    render() {
        return (
            <div>
                <div id='flex-main-container' hidden={this.props.login.loggedInUser.phone}>
                    <h4 align='left' id='flex-heading'>Admin Panel</h4>

                    <div class="flex-container" id='btn_info_conatainer'>
                        <div><Link to='/app/create_supervisor_login'><img src={btn_info} className='btn_image' id='btn_info' />  </Link>
                            <p className='descriptio' id='btn_info-dec'>Create Sup Login</p>
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
                        <div><Link to='/app/create_groups'><img src={btn_group} className='btn_image' />  </Link>
                            <p className='description'>Create Groups</p>
                        </div>
                    </div>

                </div>
                <div id='flex-main-container' hidden={!this.props.login.loggedInUser.rollno }  >
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
            </div>
        )
    }
}

let Home = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Home_Comp);


export default Home;


