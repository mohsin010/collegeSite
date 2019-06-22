import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Default from './default';
import { Provider } from 'react-redux';
import store from './store/store';
import history from './history';

import {
    Router
} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history= {history}>
            <Default />
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
