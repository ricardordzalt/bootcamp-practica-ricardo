import { EVENTS } from '../../constants';

export default (socketClient, ui) => {
    socketClient.on(EVENTS.BROADCAST_MESSAGE, (data) => {
        ui.messagesList.innerHTML += `<div><p>${data.dateNow} ${data.userName}(user): ${data.value}</p></div>`;
    });

    socketClient.on(EVENTS.BROADCAST_USERS_LIST, (activeUsers) => {
        ui.usersList.innerHTML = '';
        activeUsers.forEach(user => {
            ui.usersList.innerHTML += `<p>${user.userName}</p>`;
        });
    });

    socketClient.on(EVENTS.DISABLE_USER_INPUT, () => {
        document.getElementById('userName').disabled = true;
    });

    socketClient.on(EVENTS.BROADCAST_MESSAGE_HISTORY, (chatHistory) => {
        ui.messagesHistory.innerHTML = '';
        chatHistory.forEach(chat => {
            ui.messagesHistory.innerHTML += `<p>${chat}</p>`;
        });
    });

};