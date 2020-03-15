import { EVENTS } from "../../constants";

export default (io, users, statesSaved, liked) => socket => {
    console.log('start socket');

    io.emit(EVENTS.BROADCAST_ALL_STATES, statesSaved);


    socket.on(EVENTS.SEND_STATE, text => {
        const thisUser = users.find(user => user.id === socket.id);
        const thisText = statesSaved.find(t => t.text === text);
        console.log(thisText);
        if (thisUser !== undefined && thisText === undefined){
            const data = {
                text,
                id: socket.id,
                userLogged: thisUser.user,
                totalLikes: 0,
                usersWhoLiked: ["1", "2"]
                }
            const date = new Date();
            data.currentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
            io.emit(EVENTS.BROADCAST_STATE, data);
            statesSaved.push(data);
            }
    });

    socket.on(EVENTS.SEND_USER, userName => {
        const socketExist = users.find(exist => exist.id === socket.id)
        const userExist = users.find(exist => exist.user === userName)
        if(socketExist === undefined && userExist === undefined){
            users.push( { id: socket.id, user: userName});
        };
    });
    socket.on(EVENTS.LIKE_COUNTER, texto => {
        //var likedIndexes = [];
        //liked.forEach((a, index) => a.id === socket.id ? likedIndexes.push(index) : null)
        const checkUser = liked.filter(a => a.id === socket.id);
        const filtered = checkUser.filter(a => a.state === texto);
        if(filtered.length === 0){
            liked.push({ id: socket.id, state: texto })
            const foundIndex = statesSaved.findIndex(i => i.text === texto)
            statesSaved[foundIndex].totalLikes++;
            io.emit(EVENTS.BROADCAST_ALL_STATES, statesSaved);
        }
    });

    socket.on(EVENTS.DELETE_STATE, (dataId, dataText) => {
        if(dataId === socket.id){
            console.log(statesSaved);
            statesSaved = statesSaved.filter(s => s.text !== dataText);
            console.log(statesSaved);
            io.emit(EVENTS.BROADCAST_ALL_STATES, statesSaved);
        }
    });

    socket.on('disconnect', () => {
        users = users.filter( u => u.id !== socket.id);
    });

}