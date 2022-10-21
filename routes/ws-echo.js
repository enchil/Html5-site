const WebSocket = require('ws');

const createEchoServer = server => {
    const wsServer = new WebSocket.Server({ server });
    wsServer.on('connection', (ws, req) => {
        ws.on('message', message => {
            ws.send(message.toString());
        })
        ws.send('-----連線數-:' + wsServer.clients.size);
    })


};
module.exports = createEchoServer;