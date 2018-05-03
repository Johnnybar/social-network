import React from 'react';
const defaultState = {
  messagesArr: []
};

export default function(state = defaultState, action) {
  if (action.type == 'GET_FRIENDS') {
    state = Object.assign({}, state, {friends: action.friends});
  }
  if (action.type == 'ACCEPT_ON_FRIENDS') {
    state = Object.assign({}, state, {
      friends: state.friends.map(friend => {
        if (friend.id == action.id) {
          return Object.assign({}, friend, {status: 'Terminate Friend Request'});
        }
        return friend;
      })
    });
  }

  if (action.type == 'TERMINATE_ON_FRIENDS') {
    state = Object.assign({}, state, {
      friends: state.friends.filter(friend => friend.id != action.id)
    });
  }

  if (action.type == 'PLACE_ONLINE_USERS') {

    state = Object.assign({}, state, {onlineUsers: action.onlineUsers});
  }

  if (action.type == 'ADD_ONLINE_USER') {
    if (!state.onlineUsers) {
      return state;
    } else {
      state = Object.assign({}, state, {
        onlineUsers: state.onlineUsers.concat(action.userId)
      });
    }
  }

  if (action.type == 'REMOVE_ONLINE_USER') {
    if (!state.onlineUsers) {
      return state;
    } else {
      let users = state.onlineUsers.filter(user => {
        return user.id != action.userId.userId;
      });

      state = Object.assign({}, state, {onlineUsers: users});
    }
  }

  if (action.type == 'GET_MESSAGES') {

    state = Object.assign({}, state, {messagesArr: action.messagesArr});
  }

  if (action.type == 'ADD_SINGLE_MESSAGE') {
    if (state.messagesArr.length > 10) {
      state.messagesArr.shift();
    }
    state = Object.assign({}, state, {

      messagesArr: [
        ...state.messagesArr,
        action.messageWithUser
      ]
    });
  }

  if (action.type == 'ALERT_NEW_REQUEST') {
    state = Object.assign({}, state, {id: action.id});
  }

  return state;
}
