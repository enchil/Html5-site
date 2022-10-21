const WebSocket = require('ws');
const { map } = require('../app');

const createEchoServer = server => {
    const wsServer = new WebSocket.Server({ server });
    const map = new Map();
    wsServer.on('connection', (ws, req) => {

        map.set(ws, { name: '' });
        ws.on('message', message => {
            let sendMsg = '';// 廣播的內容
            const obj = map.get(ws);
            if (!obj.name) {
                obj.name = message.toString();//第一次訊息設定為名稱
                sendMsg = obj.name + '進來聊天了，目前人數:' + wsServer.clients.size;
            } else {
                sendMsg = `${obj.name}:${message.toString()}`;
            };
            wsServer.clients.forEach(c => {
                //c是clients
                //判斷c是否連線
                if (c.readyState === WebSocket.OPEN) {
                    c.send(sendMsg);
                }
            });
        });
        // ws.send('-----連線數-:' + wsServer.clients.size);
    });


};
module.exports = createEchoServer;