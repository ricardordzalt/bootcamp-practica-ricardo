import { EVENTS } from '../../constants';

export default socketClient => {

    const stateText = document.getElementById('state-text');
    const sendState = document.getElementById('send-state');
    const states = document.getElementById('states');
    const wall = document.getElementById('wall');
    const login = document.getElementById('login');
    const userLogin = document.getElementById('userName');
    const passLogin = document.getElementById('passLogin');
    const doLogin = document.getElementById('do-login');
    const alertLogin = document.getElementById('alert-login');
    const mostActive = document.getElementById('most-active');


    wall.style.display = 'none';

    const clientData = {
        token: '', 
        userLogged: '',
        id: '',
      };
    
      function updateClientData(token, userLogged, id) {
        clientData.token = token;
        clientData.userLogged = userLogged;
        clientData.id = id;
      }

    sendState.addEventListener('click', () => {
        
        if(stateText.value.length > 0) {
            socketClient.emit(EVENTS.SEND_STATE, { 
                text: stateText.value, 
                token: clientData.token, 
                userLogged: clientData.userLogged,
                id: clientData.id
            });
        }

    });
    

    doLogin.addEventListener('click', () => {
        if(userLogin.value.length > 0 && passLogin.value.length > 0){
            socketClient.emit(EVENTS.DO_LOGIN, { userName: userLogin.value, password: passLogin.value });
        }
    });

    const sendLike = (dataText, dataId, dataToken) => {
        const data = {
            text: dataText,
            id: dataId,
            token: dataToken
        }
        socketClient.emit(EVENTS.LIKE_COUNTER, data);
    }

    const deleteState = (dataText, dataId) => {
        const data = {
            text: dataText,
            id: dataId,
        }
        socketClient.emit(EVENTS.DELETE_STATE, data);
    }

    return{
        clientData,
        updateClientData,
        sendLike,
        deleteState,
        states,
        wall,
        login,
        alertLogin,
        mostActive
    }
};