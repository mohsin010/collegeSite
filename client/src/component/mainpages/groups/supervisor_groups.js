import React, { Component } from 'react';
import './groups.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';


class Supervisor_groups_con extends Component {
    constructor(props) {
        super(props);
        this.state ={
            groups: [] ,
            width: ''
        }
    }
    handleChange = (evt) =>{
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    saveChanges = (group)=>{
        let data = {
            groupid: group.groupid,
            width: this.state.width
        }
        fetch('/groups_progress_update', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).then((group) => {
                debugger;
                if (group) {
    
                   
                    this.setState({
                        // groups: groups
                        width: ''
                    })
    
    
                } else {
                    alert('Error is Occured');
                }
    
            });
    }

    // componentDidMount(){
      
    // }


    render() {
        let data = {
            supervisorname: this.props.login.loggedInUser.name
        }
        fetch('/sup_groups_display', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).then((groups) => {
                if (groups) {
    
                   
                    this.setState({
                        groups: groups
                    })
    
    
                } else {
                    alert('Error is Occured');
                }
    
            });
        return (




            <div className='group_list_disp'>
                <div className='pcontainer' id='groups_list' align='left'  ><span className='ptitle'>Groups List</span>
                    <div className='groups_tbl'>
                        <table id='tbl-assignment' >
                            {/* <hr className='hr' />                     */}
                            <tbody>
                                {/* <caption>Instructor's Info</caption> */}
                                {/* <hr /> */}

                                <tr>
                                    {/* <th id='a_no'>No</th> */}
                                    <th className='grp_id' >Group Id</th>
                                    <th className=''>Title</th>
                                    <th className=''>Progress</th>
                                    <th className='grp_id'>Members</th>

                                </tr>


                                {this.state.groups.map((group) => {

                                    return <tr>
                                       
                                        {/* <td  >{group.no}</td> */}
                                        <td className='grp_id_v'>{group.groupid}</td>
                                        <td className='show_assign' className='tbl_group_val' id='project_title' >{group.title}</td>
                                        <td className='show_assign' className='tbl_group_val' id='progress' >
                                            <span className='progress_inpt_cont'>
                                            <span className='fasave'><button onClick={this.saveChanges.bind(this, group)}><FontAwesomeIcon className='fontaws' icon={faSave} /></button></span>
                                            <span><span className='w_disp'>{group.width}</span><input type='numeric' name='width'  onChange={this.handleChange} className='progress_inpt' /></span>
                                            </span>
                                        </td>
                                        {/* <td className='show_assign'>{assignment.topic}</td> */}
                                        <td className='show_assign' >
                                            {group.st_group.map((item) => {
                                                return <span >{item}<br /></span>

                                            })}
                                        </td>
                                    </tr>

                                })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


        )
    }
}
let Supervisor_groups = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(Supervisor_groups_con);

export default Supervisor_groups ;