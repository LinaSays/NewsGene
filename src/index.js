import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';

ReactDOM.render(
    (<Provider store={store}>
      <App />
    </Provider>),
    document.getElementById('root')
);
