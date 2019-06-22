import React from 'react';
import store from '../../../store/store';
import history from '../../../history';


const logOut = () => {

    fetch('/logout', {
        method: 'POST',
        // body: JSON.stringify(this.state)

    })
        .then((resp) => resp.json()).then((resp) => {
            if (resp.success) {
                store.dispatch({
                    payload: resp,
                    type: 'user_logout_success'
                })
                console.log(history);
                history.push('/');
            } else {

                console.log('log out');
            }

        })
        

}


export default logOut;