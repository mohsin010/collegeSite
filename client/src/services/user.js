import store from '../store/store';
import history from '../history';

const userService = {
    signup: function (data) {

        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then((resp) => {

                if (resp._id) {
                    store.dispatch({
                        type: 'user_signedup_success',
                        payload: resp
                    });
                    history.push('/login');
                    // history.moveBack();
                }

            });

    },
    login: function (data) {

        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then((user) => {

                if (user.id) {

                    store.dispatch({
                        type: 'user_signedin_success',
                        payload: user
                    });


                    history.push('/dashboard');
                } else {
                    store.dispatch({
                        type: 'user_signedin_failed',
                        payload: user
                    });
                }

            });

    }
};

export default userService;