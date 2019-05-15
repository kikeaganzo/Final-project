import axios from './axios';

//aquí van las funciones
export async function getFriendsWannabes() {
    console.log("Actions here!!!");
    const {data} = await axios.get("/friends.json");
    console.log("Data from axios: ", data);
    return {
        type: "GET_FRIENDS_WANNABES",
        friend: data
    };

}

export async function deleteFriend(id) {
    console.log("Delete friend", id);
    await axios.post("/delete-friend", { Id: id });
    return {
        type: "DELETE_FRIENDS",
        friend: id
    };
}

export async function acceptFriend(id) {
    console.log("accept friend in actions", id);
    await axios.post("/update", { Id: id });
    return {
        type: "ACCEPT_FRIENDS",
        friend: id
    };
}

//SOCKET Actions
export function onlineUsers(data){
    console.log('ACTIONS HERE data in onlineUsers', data);
    return{
        type: 'ONLINE_USERS',
        onlineUsers: data.onlineUsers
    };

}
export function userJoined (data){
    console.log('ACTIONS HERE data in userJoined', data);
    return{
        type: 'USER_JOINED',
        userJoined: data.user
    };

}
export function userLeft (data){
    console.log('ACTIONS HERE data in userLeft', data);
    return{
        type: 'USER_LEFT',
        id: data
    };
}

// Chat
export function chatMessages (data){
    console.log("Actions here messages chat", data);
    return {
        type: "MESSAGES",
        messages: data
    };
}

export function newChatMsg (data){
    console.log("Actions here New message Chat", data);
    return {
        type: "NEW_CHAT_MESSAGE",
        messages: data
    };


}

export function newMessagePrivate (data){
    console.log("newMessagePrivate Actions file here", data);
    return {
        type: "NEW_PRIVATE_MESSAGE",
        messages: data
    };


}

export function getPrivateMessages (data){
    console.log("getPrivateMessages Actions file here", data);
    return {
        type: "GET_PRIVATE_MESSAGES",
        messages: data
    };


}
