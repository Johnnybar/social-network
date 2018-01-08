import React from 'react';
import {store} from './start';
import * as io from 'socket.io-client';
import axios from './axios';
let onlineUsers=[];
import {placeOnlineUsers, addUserToOnlineUsers, removeUserFromOnlineUsers, getMessages, addSingleMessage, alertAboutFriendRequest} from './actions';


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
            // console.log('this is userLeft: ', userId);
        });
        socket.on('chatMessages', (messagesArr)=>{
            store.dispatch(getMessages(messagesArr));
            // console.log('this is the messagesArr: ', messagesArr);
        });

        socket.on('chatMessage', (messageWithUser)=>{
            store.dispatch(addSingleMessage(messageWithUser));
            // console.log("wtf");
        });
        socket.on('alertAboutFriendRequest', (id)=>{
            // console.log('alert about friend request!');
            store.dispatch(alertAboutFriendRequest(id));
        });
    }
    return socket;
}
