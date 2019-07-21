import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logOut from '../mainpages/signout/signout';

import ResponsiveMenu from 'react-responsive-navbar';

class Example extends Component {
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
        return (
            <ResponsiveMenu
                menuOpenButton={<div />}
                menuCloseButton={<div />}
                changeMenuOn="500px"
                largeMenuClassName="large-menu-classname"
                smallMenuClassName="small-menu-classname"
                menu={
                    <div>
                        <Link to='/app' name='home' className={'a active'} onClick={(e) => this.toggleClass(e)} >

                            Home
            </Link>
                        <Link to='/profile' name='profile' className={'a'} onClick={(e) => this.toggleClass(e)} >

                            Profile
 </Link>
                        <Link to='/noticeboard' name='noticeboard' className={'a'} onClick={(e) => this.toggleClass(e)}>
                            Notice Board
                                    </Link>
                        <Link to='/documents' className={'a'} onClick={(e) => this.toggleClass(e)} >
                            Documents
                                    </Link>
                        <Link to='/result' className={'a'} onClick={(e) => this.toggleClass(e)} >
                            Result
                                    </Link>
                        <a href='mailto:sherazmohsin257@gmail.com' target='_blank' className={'a'} id='anchor' onClick={(e) => this.toggleClass(e)} >
                            Mail
                                    </a>
                        <button id='btn_logout' className={'a'} onClick={logOut} onClick={(e) => this.toggleClass(e)}>
                            Sign Out
                                    </button>
                        {/* <span>Item 3</span>
                        <span>Item 4</span>
                        <span>Item 1</span>
                        <span>Item 2</span>
                        <span>Item 3</span>
                        <span>Item 4</span>
                        <span>Item 1</span>
                        <span>Item 2</span>
                        <span>Item 3</span>
                        <span>Item 4</span> */}
                    </div>
                }
            />
        )
    }
}
export default Example;
