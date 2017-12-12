import React from 'react';
import {store} from './start';
import * as io from 'socket.io-client';
import axios from 'axios';
let onlineUsers=[];
import {placeOnlineUsers, addUserToOnlineUsers, removeUserFromOnlineUsers} from './actions';


let socket;

// -initialization
export default function socketConnections(){
    if(!socket){
        socket =   io.connect();
        // socket = io.connect();
        socket.on('connect', function(){
            axios.get('/connected/' + socket.id);
        });
        socket.on('userJoined', (userId) => {
            store.dispatch(addUserToOnlineUsers(userId));
        });
        socket.on('onlineUsers',(users) => {
            store.dispatch(placeOnlineUsers(users));
        });
        socket.on('userLeft', (userId)=>{
            store.dispatch(removeUserFromOnlineUsers(userId));
            console.log('this is userLeft: ', userId);
        });
    }
}



// socket.on('onlineUsers', function() {
//     socket.emit('onlineUsers', {
//         message: 'This is online users'
//     });
// });
// socket.on('userJoined', function() {
//     socket.emit('userJoined', {
//         message: 'This is user Joined'
//     });
// });
// socket.on('userLeft', function() {
//     socket.emit('userLeft', {
//         message: 'This is user left'
//     });
// });



// 	*axios req to /connected/+socketId
// 	*socket.on for onlineUsers, userJoined, userLeft
// 	*all event handlers should dispatch actions
