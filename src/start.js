import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import Logo  from './logo';

let component;
if (location.pathname == '/welcome'){
    component = < Welcome />;
} else{
    component = < Logo />
}


ReactDOM.render(
    component,
    document.querySelector('main')
);


//This is a component v̍
// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
