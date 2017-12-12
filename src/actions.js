import React from 'react';
import axios from 'axios';

export const allFriendRequests = function() {
    return axios.get('/getFriendsInfoToFriends').then((friends)=>{
        return {
            type:'GET_FRIENDS',
            friends:friends.data.results
        };
    });
};

//ADD ID TO ACTIONS NOW THAT WE ARE GETTING IT FROM FRIENDS

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
    console.log('this is user id in actions: ', userId);
    return {
        type: "REMOVE_ONLINE_USER",
        userId: userId
    };

}
