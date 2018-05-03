import React from 'react';
import {store} from './start';
import * as io from 'socket.io-client';
import axios from './axios';
let onlineUsers = [];
import {
  placeOnlineUsers,
  addUserToOnlineUsers,
  removeUserFromOnlineUsers,
  getMessages,
  addSingleMessage,
  alertAboutFriendRequest
} from './actions';

let socket;

//Initialization
export default function socketConnections() {
  if (!socket) {
    socket = io.connect();
    socket.on('connect', function() {
      axios.get('/connected/' + socket.id);
    });
    socket.on('userJoined', (userId) => {
      store.dispatch(addUserToOnlineUsers(userId));
    });
    socket.on('onlineUsers', (users) => {
      store.dispatch(placeOnlineUsers(users));
    });
    socket.on('userLeft', (userId) => {
      store.dispatch(removeUserFromOnlineUsers(userId));
    });
    socket.on('chatMessages', (messagesArr) => {
      store.dispatch(getMessages(messagesArr));
    });

    socket.on('chatMessage', (messageWithUser) => {
      store.dispatch(addSingleMessage(messageWithUser));
    });
    socket.on('alertAboutFriendRequest', (id) => {
      store.dispatch(alertAboutFriendRequest(id));
    });
  }
  return socket;
}
