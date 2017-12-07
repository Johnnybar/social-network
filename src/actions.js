import React from 'react';
import axios from 'axios';

export const allFriendRequests = function() {
    return axios.get('/getFriendsInfoToFriends').then((friends)=>{
        console.log('this is now our friends in actions: ', friends);
        return {
            type:'GET_FRIENDS',
            friends:friends.data.results
        };
    });
};

//ADD ID TO ACTIONS NOW THAT WE ARE GETTING IT FROM FRIENDS

export const acceptFriendOnFriends = function(id) {
    return axios.post('/acceptFriendOnFriends', {id}).then((resp)=>{
        console.log('accepted this friend request on friends page', resp.data.otherId);
        return {
            type:'ACCEPT_ON_FRIENDS',
            id: resp.data.otherId
        };
    });
};

// export const terminateFriendOnFriends = function() {
//     return axios.post('/terminateFriendOnFriends').then((friends)=>{
//         console.log('terminated this friend request on friends page');
//         return {
//             type:'TERMINATE_ON_FRIENDS',
//             friends:friends.data.results
//         };
//     });
// };
