import { EVENTS } from '../../constants';

export default socketClient => {

    const userName = document.getElementById('user-name');
    const sendUser = document.getElementById('send-user');
    const stateText = document.getElementById('state-text');
    const sendState = document.getElementById('send-state');
    const states = document.getElementById('states');
    const alert = document.getElementById('show-user-alert');

    sendState.addEventListener('click', () => {
        
        if(stateText.value.length > 0) {
            socketClient.emit(EVENTS.SEND_STATE, stateText.value);
        }

    });
    
    sendUser.addEventListener('click', () => {
        
        if(userName.value.length > 0) {
            socketClient.emit(EVENTS.SEND_USER, userName.value);
        }


    });

    const sendLike = text => {
        socketClient.emit(EVENTS.LIKE_COUNTER, text);
    }

    const deleteState = (dataId, dataText) => {
        socketClient.emit(EVENTS.DELETE_STATE, dataId, dataText);
    }

    return{
        sendLike,
        deleteState,
        states
    }
};