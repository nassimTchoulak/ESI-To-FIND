import React from 'react';
import ReactDOM from 'react-dom';
import Core from './core';

import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';


import * as serviceWorker from './serviceWorker'




    //const ta22= <Core  />;

const ta22 = <Provider store={store}>
    <Core />
</Provider>;





    ReactDOM.render(ta22, document.getElementById('root'));
//ReactDOM.render(ta22, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. N0ote this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
