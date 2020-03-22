import { EVENTS } from '../../constants';

export default (socketClient, ui) => {
    socketClient.on(EVENTS.BROADCAST_STATE, data => {
        console.log('broadcastState', data);
        ui.states.innerHTML += `<div>
        <p>${data.currentDate} - ${data.userLogged} </br> ${data.text}</p>
        <button  onClick="window.ui.sendLike('${data.text}', '${data.id}', '${data.token}')">Like</button> ${data.totalLikes}
        <button  onClick="window.ui.deleteState('${data.text}', '${data.id}')">Borrar</button> 
        </div>`;
    });

    socketClient.on(EVENTS.BROADCAST_ALL_STATES_FIRST, statesSaved => {
        ui.states.innerHTML = '';
        statesSaved.forEach(data => { 
            ui.states.innerHTML += `<div>
            <p>${data.createdAt} - ${data.userName} </br> ${data.text}</p>
            <button  onClick="window.ui.sendLike('${data.text}')">Like</button> ${data.totalLikes}
            <button  onClick="window.ui.deleteState('${data.id}', '${data.text}')">Borrar</button> 
            </div>`;
            ui.states.style.display = 'none';
            ui.mostActive.style.display = 'none';
        });
    });

    socketClient.on(EVENTS.BROADCAST_ALL_STATES, statesSaved => {
        ui.states.innerHTML = '';
        statesSaved.forEach(data => { 
            ui.states.innerHTML += `<div>
            <p>${data.createdAt} - ${data.userName} </br> ${data.text}</p>
            <button  onClick="window.ui.sendLike('${data.text}')">Like</button> ${data.totalLikes}
            <button  onClick="window.ui.deleteState('${data.id}', '${data.text}')">Borrar</button> 
            </div>`;
        });
    });

    
    socketClient.on(EVENTS.SUCESS_LOGIN, info => {
        ui.updateClientData(info.token, info.userLogged, info.idUser);
        ui.login.style.display = 'none';
        ui.wall.style.display = 'block';
        ui.mostActive.style.display = 'block';
        ui.states.style.display = 'block';
        });

    socketClient.on(EVENTS.FAILED_LOGIN, info => {
        ui.alertLogin.innerHTML = `<p>Vuelve a intentarlo: ${info}</p>`
        });

    socketClient.on(EVENTS.EXPIRATED_TOKEN, () => {
        ui.login.style.display = 'block';
        ui.wall.style.display = 'none';
        ui.states.style.display = 'none';
        ui.mostActive.style.display = 'none';
        ui.alertLogin.innerHTML = `<p>Se ha agotado el tiempo de uso de sesión, vuelve a loggear</p>`
        });

        socketClient.on(EVENTS.BROADCAST_COMMON_USERS, mostActive => {
            ui.mostActive.innerHTML += '<p>Usuarios más activos</p>';
            mostActive.forEach(data => { 
                ui.mostActive.innerHTML += `<div>
                <p>${data}</p>
                </div>`;
            });
        });
            
};