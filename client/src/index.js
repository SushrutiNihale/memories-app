import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { App } from './App';
import reducers from './reducers';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
store.subscribe(() => {
    console.log("subscribe: ", store.getState());
})

ReactDOM.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId='423720360471-l0f4kjdd6o4b0g0hvkjkdk7975hck6ng.apps.googleusercontent.com'>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);