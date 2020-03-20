import { EVENTS } from '../../constants';

export default (socketClient) => {
    socketClient.emit(EVENTS.TEST, { Values: 'hello' });
    const userName = document.getElementById('userName');
    const message = document.getElementById('message');
    const sendMessage = document.getElementById('send-message');
    const messagesList = document.getElementById('messages-list');
    const usersList = document.getElementById('users-list');
    const messagesHistory = document.getElementById('messages-history');
    const sendUser = document.getElementById('send-user');
    const lastUsersConnected = document.getElementById('last-users-connected');
    
    
    sendMessage.addEventListener('click', () => {

        if(message.value.length > 0 && userName.value.length > 0 && userName.disabled === true){
            socketClient.emit(EVENTS.SEND_MESSAGE, { value: message.value, userName: userName.value });
        message.value = '';
        }
    });

    sendUser.addEventListener('click', () => {
        if(userName.value.length > 0 && userName.disabled === false){
            socketClient.emit(EVENTS.SEND_USER, { userName: userName.value });
        }
    });

    return {
        usersList,
        messagesList,
        messagesHistory,
        lastUsersConnected
    }
};