import { EVENTS } from '../../constants';

export default (socketClient, ui) => {
    socketClient.on(EVENTS.BROADCAST_STATE, data => {
        console.log('broadcastState', data);
        ui.states.innerHTML += `<div>
        <p>${data.currentDate} - ${data.userLogged} </br> ${data.text}</p>
        <button  onClick="window.ui.sendLike('${data.text}')">Like</button> ${data.totalLikes}
        <button  onClick="window.ui.deleteState('${data.id}', '${data.text}')">Borrar</button> 
        </div>`;
    });

    socketClient.on(EVENTS.BROADCAST_ALL_STATES, statesSaved => {
        ui.states.innerHTML = '';
        statesSaved.forEach(data => { 
            ui.states.innerHTML += `<div>
            <p>${data.currentDate} - ${data.userLogged} </br> ${data.text}</p>
            <button  onClick="window.ui.sendLike('${data.text}')">Like</button> ${data.totalLikes}
            <button  onClick="window.ui.deleteState('${data.id}', '${data.text}')">Borrar</button> 
            </div>`;
        });
    });

};