import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import Welcome from './welcome';
import Logo  from './logo';
import Login from './login';
import App from './app'
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import Register from './register';
import Profile from './profile'
import OtherUsers from './otherusers'
import FriendButton from './friendbutton'
import Friends from './friends'
import Online from './online'
import { composeWithDevTools } from 'redux-devtools-extension';
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import socketConnections from './socket'

let router;

const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
  	</Route>
    </Router>
);

const LoggedInRouter = (
    <Provider store = {store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="/users/:id" component={OtherUsers} />
        <Route path="/friends" component ={Friends} />
        <Route path="/online" component ={Online} />
        <Redirect from ="*" to="/" />
        <IndexRoute component={Profile} />
    </Route>
    </Router>
</Provider>
);

if (location.pathname == '/welcome/'){
    router = notLoggedInRouter;
} else{
    router = LoggedInRouter;
}

ReactDOM.render(
    router,
    document.querySelector('main')
);
