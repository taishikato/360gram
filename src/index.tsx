import React from 'react';
import ReactDOM from 'react-dom';
import './assets/Bulma.scss';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-27648393-19');

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
