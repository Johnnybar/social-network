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


    // if (action.type == 'TERMINATE_ON_FRIENDS') {
    //     state = Object.assign({}, state, {
    //         friends: friends.filter(friend => friend.id != action.friendId)
    //     });
    // }

    return state;
}




// if (action.type == 'ACCEPT_FRIEND') {
//     state = Object.assign({}, state, {
//         friends: friends.map(friend => {
//             if (friend.id == action.id) {
//                 return Object.assign({}, friend, {
//                     status: 'ACCEPTED'
//                 });
//             }
//             return friend;
//         })
//     });
// }
