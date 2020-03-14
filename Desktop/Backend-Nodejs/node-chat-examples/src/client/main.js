import socketHandler from './socketHandler';
import uiHandler from './uiHandler';

const socketClient = io();
const ui = uiHandler(socketClient);

socketHandler(socketClient, ui);