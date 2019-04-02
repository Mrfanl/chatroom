import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';

import Register from './register/register';
import Login from './login/login';
import MyCenter from './mycenter/mycenter';
import Authroute from './authroute/Authroute';

import reducers from './reducers';

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
    <div>
      <Authroute/>
      <Switch>
        <Route path='/register' component={ Register }/>
        <Route path='/login' component={ Login }/>
        <Route path='/mycenter' component={ MyCenter }>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
   </Provider>
  )
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
