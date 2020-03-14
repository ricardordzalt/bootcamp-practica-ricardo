export default io => socket => {
    socket.on('test', (data) => {
        console.log('test connection', data);
    });
}