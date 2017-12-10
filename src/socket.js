import React from 'react';
import {store} from './start';
import * as io from 'socket.io-client';
import axios from 'axios';
let onlineUsers=[];
import {placeOnlineUsers} from './actions';


let socket;

// -initialization
export default function socketConnections(){
    if(!socket){
        socket =   io.connect({
            upgrade: false,
            transports: ['websocket']
        });
        // socket = io.connect();
        socket.on('uponConnection', function(){
            axios.get('/connected/' + socket.id);
        });
        socket.on('userJoined', (user) => {
            console.log('this is userJoined on socket.js', user);

        });
        socket.on('onlineUsers',(users) => {
            store.dispatch(placeOnlineUsers(users));
            console.log('this is online users on socket.js: ', users);
        });
        socket.on('uponDisconnection',function(){
            console.log('in userLeft in socket.js');
            axios.get('/disconnected/'+socket.id);
        });
        socket.on('userLeft', (userLeft)=>{
            console.log('this is the user who left: ', userLeft);
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
