import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './Store/Store';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>)
    , document.getElementById('root'));
registerServiceWorker();