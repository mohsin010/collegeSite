import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RedirectLogin extends Component {

    render() {
        return (
            <div id='redir_main-container'>
                <table id='tbl_render'>
                <thead><div id='welcome'><span>Welcome ! </span></div></thead>
                    <tbody>
                        <tr id='tr1'>Your Account is Created Successfully</tr>
                        <tr id='tr2'><span>Click <Link to='/'>here</Link> to Login</span></tr>
                    </tbody>
                    <tfoot>Learning Management System</tfoot>
                </table>
                {/* 
                <header>hyyy</header>
                <div id='success'><h3>SignedUp Successfully</h3></div>
                 */}
            </div>
        )
    }

}

export default RedirectLogin;