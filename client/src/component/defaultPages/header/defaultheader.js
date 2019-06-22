import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './defaultheader.css'
import PMS from '../../../data/icon.jpg';
import NAME from '../../../data/PMS Name.jpg'
import GMDC from '../../../data/GMDC.jpg'

// import style from

class DefaultHeader extends Component {
    render() {
        return (
            <div>
                <div className={'header'}>
                    <div >
                        <Link to='/'>
                            <img className={'logo-pms'} src={PMS} />
                        </Link>
                    </div>

                    <div id={'title-div'}>
                        <Link to='/'>
                            <img className={'title'} src={NAME} />
                        </Link>
                    </div>
                    <div >
                        <img className={'logo-gmdc'} src={GMDC} />
                    </div>

                </div>
            </div>
        )
    }

}

export default DefaultHeader;