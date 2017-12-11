import React from 'react';

export default function(state = {}, action) {
    if (action.type == 'GET_FRIENDS') {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type == 'ACCEPT_ON_FRIENDS') {
        state = Object.assign({}, state, {
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return Object.assign({}, friend, {
                        status: 'Terminate Friend Request'
                    });
                }
                return friend;
            })
        });
    }

    if (action.type == 'TERMINATE_ON_FRIENDS') {
        state = Object.assign({}, state, {
            friends: state.friends.filter(friend =>
                friend.id != action.id)
        });
    }

    if (action.type == 'PLACE_ONLINE_USERS') {
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
    }

    if (action.type == 'ADD_ONLINE_USER') {
        console.log('this is action add online user on reducer: ',action.userId);
        state = Object.assign({}, state, {
            onlineUsers:  state.onlineUsers.concat(action.userId)
        });
    }

    if (action.type == 'REMOVE_ONLINE_USER') {
        console.log('this is action remove online user ',action.userId);
        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.filter(user => user.userId != action.userId)
        });
    }

    return state;
}
