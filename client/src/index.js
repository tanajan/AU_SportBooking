import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// ----State management
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './components/reducer/rootreduce'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer,composeWithDevTools());

root.render(
    <Provider store = {store}>
    <App />
    </Provider>
);

