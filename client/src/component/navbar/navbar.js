import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logOut from '../mainpages/signout/signout';


// class Nav extends Component {
//     render() {
//         return
const Nav = () => (
    <div className={'nav-main'}>

        <table className={'tbl'} cellSpacing={'0'} cellPadding={'0'} border={'0'}>
            <tbody>
                <tr>
                    <td>
                        {/* <button> */}
                        <Link to='/app' className={'a'}>

                            Home
                                    </Link>
                        {/* </button> */}
                    </td>
                    <td>

                        <Link to='/profile' className={'a'}>

                            Profile
                         </Link>
                    </td>
                    {/* <td>
                        <Link to='/schedule/meeting' className={'a'}>
                            Meeting Schedule
                            </Link>      
                    </td> */}
                    <td>
                        <Link to='/noticeboard' className={'a'}>
                            Notice Board
                                    </Link>
                    </td>
                    <td>
                        <Link to='/documents' className={'a'}>
                            Documents
                                    </Link>
                    </td>
                    <td>
                        <Link to='/result' className={'a'}>
                            Result
                                    </Link>
                    </td>
                    <td>
                        {/* <a href='www.google.com'> */}
                        <a href='mailto:sherazmohsin257@gmail.com' target='_blank'  className={'a'} id='anchor'>
                            {/* <a href={'mailto:Sherazmohsin257@gmail.com'}>Mail</a> */}Mail
                                    </a>
                                    {/* </a> */}
                    </td>
                    <td>
                        <button id='btn_logout' className={'a'} onClick={logOut}>
                            Sign Out
                                    </button>
                    </td>


                </tr>
            </tbody>
        </table>


    </div>
)
//     }
// }

export default Nav;