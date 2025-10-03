import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 3000});
wss.on("connection", (ws) => {
  console.log('client connection');

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`You sent: ${message}`); // 向客户端发送消息
  });

    // 可选：定时向客户端发送消息
  setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) { // 检查连接状态
      ws.send(JSON.stringify({ message: '定时消息' }));
    }
  }, 2000);
});

export default wss