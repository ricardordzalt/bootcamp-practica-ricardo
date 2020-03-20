import {EVENTS} from '../../constants';
import connection from '../../modules/connection';

export default (io, activeUsers, chatHistory, connection) => (socket) => {
    io.emit(EVENTS.BROADCAST_MESSAGE_HISTORY, chatHistory);
    io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
    connection.query('select * from users where lastConnection >= now() - interval 15 second', (error, results) => {
        io.emit(EVENTS.BROADCAST_LAST_USERS_CONNECTED_LIST, results);
    });

    socket.on(EVENTS.TEST, (data) => {
        console.log('test connection', data);
    });

    socket.on(EVENTS.SEND_MESSAGE, (data) => {
        //console.log(data);
        let date = new Date();
        data.dateNow = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + ' [' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ']';
        chatHistory.push(data);
        connection.query('insert into messages (message, userName) values (?, ?)', [data.value, data.userName], (error, result) => {
            if(!error) {
                io.emit(EVENTS.BROADCAST_MESSAGE, data);
            }
        });
    });

    socket.on(EVENTS.SEND_USER, (data) => {
        //const nuevo = activeUsers.find(a => a.userName === data.userName);
        //if (nuevo === undefined) {
            activeUsers = activeUsers.filter(a => a.userName !== data.userName);
            activeUsers.push({ id: socket.id, userName: data.userName });         
            console.log(activeUsers);   
            io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
            io.emit(EVENTS.DISABLE_USER_INPUT);
        //}
        connection.query('select * from users where userName = ?', [data.userName], (error, result) => {
            if(result.length === 1){
                connection.query('update users set lastConnection = now() where userName= ?', [data.userName])
            }else if(result.length === 0){
                connection.query('insert into users (userName) values (?)', [data.userName]);
            }
        });
    });

    socket.on(EVENTS.DISCONNECT, () => {
        console.log(socket.id);
        const disconnectedUser = activeUsers.find( u => u.id === socket.id);
        activeUsers = activeUsers.filter( u => u.id !== socket.id);
        console.log(disconnectedUser)
        if(disconnectedUser) {
            connection.query('update users set lastConnection = now() where userName= ?', [disconnectedUser.userName])
        }
        console.log('disconnect', socket.id);
        io.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
    });
}