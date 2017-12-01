import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import Logo  from './logo';
import Login from './login';
import App from './app'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Register from './register';
import Profile from './profile'
import OtherUsers from './otherusers'

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
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="/users/:id" component={OtherUsers} />
        <IndexRoute component={Profile} />
    </Route>
    </Router>
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


//This is a component v̍
// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
