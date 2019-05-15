import * as io from 'socket.io-client';
import {onlineUsers, userJoined, userLeft, chatMessages, newChatMsg, newMessagePrivate, getPrivateMessages} from './actions';
let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', data => {
            store.dispatch(
                onlineUsers(data)
            );
        });

        socket.on('userJoined', data => {
            store.dispatch(
                userJoined(data)
            );
        });

        socket.on('userLeft', data => {
            store.dispatch(
                userLeft(data)
            );
        });
        socket.on('messages', data => {
            store.dispatch(
                chatMessages(data)
            );
        });


        socket.on('chatMessages', data => {
            store.dispatch(
                newChatMsg(data)
            );
        });

        socket.on('messagePrivate', data => {
            store.dispatch(
                newMessagePrivate(data)
            );
        });

        socket.on('getPrivateMessages', data => {
            store.dispatch(
                getPrivateMessages(data)
            );
        });
    }

    return socket;
}
