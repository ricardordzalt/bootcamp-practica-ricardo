import {EVENTS} from '../../constants';

export default (io, activeUsers, chatHistory) => (socket) => {

    
    socket.on(EVENTS.TEST, (data) => {
        console.log('test connection', data);
        io.emit(EVENTS.BROADCAST_MESSAGE_HISTORY, chatHistory);
        io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
    });

    socket.on(EVENTS.SEND_MESSAGE, (data) => {
        //console.log(data);
        let date = new Date();
        data.dateNow = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + ' [' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ']';
        chatHistory.push(`<div><p>${data.dateNow} ${data.userName}(user): ${data.value}</p></div>`);
        io.emit(EVENTS.BROADCAST_MESSAGE, data);
    });

    socket.on(EVENTS.SEND_USER, (data) => {
        const nuevo = activeUsers.find(a => a.userName === data.userName);
        if (nuevo === undefined) {
            activeUsers.push({ id: socket.id, userName: data.userName });
            io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
            io.emit(EVENTS.DISABLE_USER_INPUT);
        }
        
    });

    socket.on(EVENTS.DISCONNECT, () => {
        activeUsers = activeUsers.filter( u => u.id !== socket.id);
        console.log(activeUsers);
        console.log('disconnect', socket.id);
        io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
    });
}