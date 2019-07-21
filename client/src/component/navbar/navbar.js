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
    toggleClass(e) {
        let classes = 'a';
        let els = document.getElementsByClassName('a active');
        if (els) {
            while (els[0]) {
                els[0].classList.remove('active')
            }
        }
        e.target.className = classes.replace('a', 'a active');
    }

    changeColor = (e) => {

        this.setState({

            selected: !this.state.selected
        })
        console.log(e);
        // console.log(this.state.selected.name);
        if (this.state.selected && this.state.selected.name == e) {
            this.setState({
                selected: null

            })
        }




    }

    render() {
        return (<div className={'nav-main'}>

            {/* <table className={'tbl'} cellSpacing={'0'} cellPadding={'0'} border={'0'}>
                <tbody>
                    <tr>
                        <td> */}
            <div className='nav_main_sec'>
                {/* <div className='item_container ' onClick={(e) => this.toggleClass(e)}> */}

                    <Link to='/app' name='home' className={'a active'} >

                        Home
                                    </Link>
                    {/* </td>
                        <td> */}
                {/* </div> */}
                {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <Link to='/profile' name='profile' className={'a'} >

                        Profile
                         </Link>
                    {/* </td>
                     
                        <td>  */}
                {/* </div> */}
                {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <Link to='/noticeboard' name='noticeboard' className={'a'}>
                        Notice Board
                                    </Link>
                    {/* </td>
                        <td> */}
                        {/* </div> */}
                        {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <Link to='/documents' className={'a'} >
                        Documents
                                    </Link>
                    {/* </td>
                        <td> */}
                {/* </div> */}
                {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <Link to='/result' className={'a'} >
                        Result
                                    </Link>
                    {/* </td>
                        <td> */}
                {/* </div> */}
                {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <a href='mailto:sherazmohsin257@gmail.com' target='_blank' className={'a'} id='anchor' >
                        Mail
                                    </a>
                    {/* </td>
                        <td> */}
                {/* </div> */}
                {/* <div className='item_container' onClick={(e) => this.toggleClass(e)}> */}
                    <button id='btn_logout' className={'a'}  onClick={logOut}>
                        Sign Out
                                    </button>
                {/* </div> */}
                {/* </td>

                    
                    </tr>
                </tbody>
             </table> */}

            </div>

        </div>
        )

    }
}
//     }
// }

export default Nav;