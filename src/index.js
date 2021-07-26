import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import todoApp from './reducers'
import thunk from 'redux-thunk'
import { Slide } from '@material-ui/core';

const store = createStore(todoApp, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3} 
      autoHideDuration={3000}
      anchorOrigin={{ vertical : 'bottom', horizontal : 'right'}}
      TransitionComponent={Slide}
      style = {{ marginTop : '8px'}}
      >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

