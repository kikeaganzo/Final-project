export default function reducer(state = {}, action) {
    console.log("REducer here");
    if (action.type == "GET_FRIENDS_WANNABES") {
        state = { ...state, getFriendsWannabes: action.friend };
        console.log("state in reducer", action);
        return state;
    }

    if (action.type == "ACCEPT_FRIENDS") {
        console.log("Accept friends reducer here", state.getFriendsWannabes);
        state = Object.assign({}, state, {
            getFriendsWannabes: state.getFriendsWannabes.map(friend => {
                if (action.friend == friend.id) {
                    return Object.assign({}, friend, {
                        accepted: true
                    });
                } else {
                    return Object.assign({}, friend);
                }

            })
        });
    }

    if (action.type== "DELETE_FRIENDS"){
        console.log("Delete friend reducer here", state.getFriendsWannabes);
        state={...state, getFriendsWannabes: state.getFriendsWannabes.filter(friend=>{
            if (action.friend != friend.id){
                return state;
            }
        })
        };
    }

    if (action.type == "ONLINE_USERS") {
        console.log("Reducer online users", state);
        state = { ...state, onlineUsers: action.onlineUsers };
        console.log("Reducer online users state in reducer", action);
    }

    if (action.type== 'USER_JOINED'){
        state={
            ...state,
            onlineUsers:[...state.onlineUsers, action.userJoined]
        };
        return state;
    }

    if (action.type== "USER_LEFT"){
        state={
            ...state,
            onlineUsers:state.onlineUsers.filter(onlineUsers=>{
                if (action.id != onlineUsers.id){
                    return state;
                }
            })
        };
    }

    if (action.type == "MESSAGES") {
        return {
            ...state,
            messages: action.messages
        };
    }
    if (action.type == "NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            messages: [action.messages, ...state.messages]
        };
    }

    if (action.type == "NEW_PRIVATE_MESSAGE") {
        state = {
            ...state,
            messages: [action.messages, ...state.messages]
        };
    }

    if (action.type == "GET_PRIVATE_MESSAGES") {
        state = {
            ...state,
            messages: [action.messages, ...state.messages]
        };
    }


    return state;
}
