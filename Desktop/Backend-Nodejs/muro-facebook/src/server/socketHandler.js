import { EVENTS } from "../../constants";
import {matchHash, createToken, validateToken} from './hasher';
import connection from './connection';

export default (io, users, statesSaved, liked) => socket => {
    console.log('start socket');
    connection.query('select * from states where status = 1', (error, result) => {
        io.emit(EVENTS.BROADCAST_ALL_STATES_FIRST, result);
    });
    connection.query('select userName, count(userName) from states group by userName having count(*)>=1 order by count(userName)', (error, result) => {
        let mostActive = [];
        for(let i = result.length - 1; i > result.length -4; i--) {
            mostActive.push(result[i].userName);
        }
        io.emit(EVENTS.BROADCAST_COMMON_USERS, mostActive);
    });

    socket.on(EVENTS.DO_LOGIN, data => {
        connection.query('select * from users where userName = ?', [data.userName], (error, result) => {
            if(!error){
                if(result.length === 1) {
                    if(matchHash(data.password, result[0].password)){
                        const token = createToken({
                            userName: data.userName
                        });
                        const info = {
                            token,
                            userLogged: result[0].userName,
                            idUser: result[0].id,
                            token: token
                        }
                        io.emit(EVENTS.SUCESS_LOGIN, info);
                    }
                    else{
                        io.emit(EVENTS.FAILED_LOGIN, 'Contraseña incorrecta');
                    }
                }else{
                    io.emit(EVENTS.FAILED_LOGIN, 'Usuario no encontrado');
                }
            }
            else{
                io.emit(EVENTS.FAILED_LOGIN, error.message);
            }
        });
    })

    socket.on(EVENTS.SEND_STATE, info => {
        try{
            if(validateToken(info.token)){
                connection.query('select * from states where idUser = ? and text = ? and status = 1', [info.id, info.text], (error, result) => {
                    if (result.length === 0){
                        connection.query('insert into states (text, idUser, userName, totalLikes, status) values (?, ?, ?, 0, 1)', [info.text, info.id, info.userLogged], (error1, result1) => {
                            connection.query('select * from states where id = LAST_INSERT_ID()', (error2, result2) => {
                            const data = {
                                currentDate: result2[0].createdAt,
                                userLogged: result2[0].userName,
                                text: result2[0].text,
                                totalLikes: result2[0].totalLikes,
                                id: result2[0].idUser,
                                token: info.token
                            }
                            io.emit(EVENTS.BROADCAST_STATE, data);          
                        });                  
                        });
                    }
                });
            }
        }
        catch(err){
            io.emit(EVENTS.EXPIRATED_TOKEN);
        }
    });

    socket.on(EVENTS.LIKE_COUNTER, data => {
        console.log(data.token)
        try{
            if(validateToken(data.token)){
                connection.query('update states set totalLikes = totalLikes + 1 where text = ? and idUser = ?', [data.text, Number(data.id)], (error, result) => {});
                connection.query('select * from states where status = 1', (error1, result1) => {
                io.emit(EVENTS.BROADCAST_ALL_STATES, result1);
                })
            }
        }
        catch(err){
            io.emit(EVENTS.EXPIRATED_TOKEN);
        }
    });

    socket.on(EVENTS.DELETE_STATE, data => {
            connection.query('update states set status = 0 where text = ? and idUser = ?', [data.text, Number(data.id)], (error, result) => {});
            connection.query('select * from states where status = 1', (error1, result1) => {
            io.emit(EVENTS.BROADCAST_ALL_STATES, result1);
        });
    });

    socket.on('disconnect', () => {
        users = users.filter( u => u.id !== socket.id);
    });

}