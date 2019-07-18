import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logOut from '../mainpages/signout/signout';


// class Nav extends Component {
//     render() {
//         return

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showclass: '',

        }
        this.myref = React.createRef();
    }
    toggleClass(e){
        let classes = 'a';
        let els = document.getElementsByClassName(' a active');
        if(els){
            while (els[0]) {
                els[0].classList.remove('active')
            }
        }
        e.target.className = classes.replace('a','a active');
    }

    changeColor = (e) => {

        this.setState({

            selected: !this.state.selected
        }) 
        console.log(e);
        // console.log(this.state.selected.name);
        if (this.state.selected && this.state.selected.name == e ) {
            this.setState({
                selected: null

            })
        } 

           
        

    }

    render() {
        return (<div className={'nav-main'}>

            <table className={'tbl'} cellSpacing={'0'} cellPadding={'0'} border={'0'}>
                <tbody>
                    <tr>
                        <td>
                            {/* <button> */}
                            <Link to='/app' name='home' className={'a active'}  onClick={ (e) => this.toggleClass(e)}>

                                Home
                                    </Link>
                            {/* </button> */}
                        </td>
                        <td>

                            <Link to='/profile' name='profile' className={'a '}  onClick={(e) => this.toggleClass(e)}>

                                Profile
                         </Link>
                        </td>
                        {/* <td>
                        <Link to='/schedule/meeting' className={'a'}>
                            Meeting Schedule
                            </Link>      
                    </td> */}
                        <td>
                            <Link to='/noticeboard' name='noticeboard' className={'a '} onClick={(e) => this.toggleClass(e)}>
                                Notice Board
                                    </Link>
                        </td>
                        <td>
                            <Link to='/documents' className={'a'} onClick={(e) => this.toggleClass(e)}>
                                Documents
                                    </Link>
                        </td>
                        <td>
                            <Link to='/result' className={'a'} onClick={(e) => this.toggleClass(e)}>
                                Result
                                    </Link>
                        </td>
                        <td>
                            {/* <a href='www.google.com'> */}
                            <a href='mailto:sherazmohsin257@gmail.com' target='_blank' className={'a'} id='anchor' onClick={(e) => this.toggleClass(e)}>
                                {/* <a href={'mailto:Sherazmohsin257@gmail.com'}>Mail</a> */}Mail
                                    </a>
                            {/* </a> */}
                        </td>
                        <td>
                            <button id='btn_logout' className={'a'} onClick={(e) => this.toggleClass(e)} onClick={logOut}>
                                Sign Out
                                    </button>
                        </td>


                    </tr>
                </tbody>
            </table>


        </div>
        )

    }
}
//     }
// }

export default Nav;