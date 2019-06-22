import { createStore, combineReducers } from 'redux';

import loginReducer from './reducers/login';



const store = createStore(combineReducers({ loginReducer }));

// store.dispatch({
//     type:'gretings',
//     message:'Hello friend!'
// });

export default store; 