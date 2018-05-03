import React from 'react';
import axios from './axios';

export const allFriendRequests = function() {
    return axios.get('/getFriendsInfoToFriends').then((friends)=>{
        return {
            type:'GET_FRIENDS',
            friends:friends.data.results
        };
    });
};


export const acceptFriendOnFriends = function(id) {
    return axios.post('/acceptFriendOnFriends', {id}).then((resp)=>{
        return {
            type:'ACCEPT_ON_FRIENDS',
            id
        };
    });
};

export const terminateFriendOnFriends = function(id) {
    return axios.post('/terminateFriendOnFriends', {id}).then((resp)=>{
        return {
            type:'TERMINATE_ON_FRIENDS',
            friends:resp.data.otherId,
            id
        };
    });
};

export function placeOnlineUsers(onlineUsers) {
    return {
        type: "PLACE_ONLINE_USERS",
        onlineUsers
    };

}

export function addUserToOnlineUsers(userId) {
    return {
        type: "ADD_ONLINE_USER",
        userId
    };

}

export function removeUserFromOnlineUsers(userId) {
    return {
        type: "REMOVE_ONLINE_USER",
        userId: userId
    };

}

export function getMessages(messagesArr) {
    return {
        type: "GET_MESSAGES",
        messagesArr

    };

}

export function addSingleMessage(messageWithUser) {
    return {
        type: "ADD_SINGLE_MESSAGE",
        messageWithUser

    };

}

export function alertAboutFriendRequest(id) {
    return {
        type: "ALERT_NEW_REQUEST",
        id

    };

}
