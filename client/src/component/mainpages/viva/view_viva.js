import React, { Component } from 'react';
import { connect } from 'react-redux';
import Connected_Display_Viva from './display_viva';
import Editor_Viva from './editor_viva';


class View_viva extends Component {
    render(){
        if(this.props.login.loggedInUser.rollno){
            return <div>
                <Connected_Display_Viva /> 
            </div>
        }else{
            return <div>
                <Editor_Viva />
            </div>
        }
       
    }

}

let Connected_View_viva = connect((store) => {

    return {
        login: store.loginReducer,
        assignments: store.login

    }
})(View_viva);

export default Connected_View_viva ;