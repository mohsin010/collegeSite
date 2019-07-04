
import userService from '../../services/user';


let initialState = {
    in_process: 'false',
    loggedInUser: {},
    assignments: [],
    messageId: {},
    group:{}
};

const loginReducer = (state = initialState, action) => {



    switch (action.type) {

        case 'LOGGED_IN_SUCCESS':

            return {
                ...state,
                in_process: false,
                group: { ...state.group},
                loggedInUser: action.payload
            }


        case 'user_signing_up':

            userService.signup({
                ...action
            });

            return {
                loggedInUser: {},
                in_process: true,
                uName: action.username,
            }

        case 'user_signedup_success':
            return {
                in_process: false,
                ...action.payload,
                loggedInUser: { ...state.loggedInUser }
                // loggedInUser: action.payload

            }

        case 'user_signing_in':

            userService.login({
                username: action.username,
                password: action.password,
            });

            return {
                loggedInUser: {},
                in_process: true,
                uName: action.username,
            }
            //Send data to server
            //Show loading image    
            break;


        case 'user_signedin_success':

            return {
                ...state,
                loggedInUser: action.payload,
            }
            //Hide loading image
            //Redirect to dashboard
            break;

        case 'user_signed_success':
            return {
                ...state,
                loggedInUser: action.payload,
                in_process: false,
                user_created: true
            }
            //Hide loading image
            //Redirect to dashboard
            break;

        case 'user_signed_error':
            return {
                loggedInUser: {},
                in_process: 'false'
            }
            break;

        case 'user_logout_success':
            return {
                loggedInUser: {},
                in_process: 'false'
            }
            break;

        case 'update_profile_success':
            return {
                loggedInUser: action.payload,
                in_process: 'false'
            }
            break;

        case 'assignment_uploaded':
            return {
                assignments: action.payload,
                loggedInUser: {},
                in_process: 'false'
            }
            break;

        case 'message_reply':
            return {
                assignments: { ...state.assignments},
                loggedInUser: { ...state.loggedInUser },
                group: { ...state.group},
                messageId: action.payload,
                in_process: 'false',

            }
            break;
        case 'group_loaded':
            return {
                assignments: { ...state.assignments},
                loggedInUser: { ...state.loggedInUser },
                messageId: { ...state.messageId},
                group:action.payload,
                in_process: 'false',

            }
            break;
    }
    return state;
}

export default loginReducer;