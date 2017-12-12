import React from 'react';
import {store} from './start';
import * as io from 'socket.io-client';
import axios from 'axios';
let onlineUsers=[];
import {placeOnlineUsers, addUserToOnlineUsers, removeUserFromOnlineUsers, getMessages, addSingleMessage} from './actions';


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
        socket.on('chatMessages', (messagesArr)=>{
            console.log('this is messagesArr in socketjs: ', messagesArr);
            store.dispatch(getMessages(messagesArr));
        });

        socket.on('chatMessage', (messageWithUser)=>{
            console.log('this is messageWithUser in socketjs: ', messageWithUser);
            store.dispatch(addSingleMessage(messageWithUser));
        });
    }
    return socket;
}






// 	*axios req to /connected/+socketId
// 	*socket.on for onlineUsers, userJoined, userLeft
// 	*all event handlers should dispatch actions
