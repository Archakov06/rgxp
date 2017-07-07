import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import {Provider} from 'react-redux';
import configureStore from './store/index';
import axios from 'axios';

import '../styles/app.styl';

Raven.config('https://d58ebf4f29804a69b54bad2f62fe1e68@sentry.io/160435').install();

axios.interceptors.response.use((response)=>response, error => {
  Raven.captureException(error);
  return Promise.reject(error);
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App axios={axios} />
  </Provider>,
  document.getElementById('root')
);
