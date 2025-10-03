import { type Server } from 'http'
import { WebSocket, WebSocketServer, type WebSocket as WebSocketType} from "ws";
import type { Express } from "express";


/*
  WebSocket.CONNECTING	0	正在连接	WebSocket 对象刚创建，还在尝试建立 TCP/HTTP 握手连接，还不能发送消息。
  WebSocket.OPEN	1	已连接	连接成功，数据可以正常发送和接收。通常你在 readyState === WebSocket.OPEN 时调用 send()。
  WebSocket.CLOSING	2	正在关闭	连接已经开始关闭过程，还没完全断开，此时调用 send() 可能失败。
  WebSocket.CLOSED	3	已关闭	连接已经关闭或无法建立，不能再发送消息。

*/
interface MessageType {
  content: any;
  to: number;
}

const clients = new Map<number, WebSocket>();
let clientId = 0;
function createWebSocket(server: Server) {
  const wss = new WebSocketServer({server});

  wss.on("connection", (ws, request) => {
    const currentClientId = ++clientId
    console.log(`客户端 ${currentClientId} 连接成功`);
    console.log('请求URL:', request.url);
    console.log('请求头:', request.headers);

    ws.send(JSON.stringify({
      type: 'welcome',
      clientId: currentClientId,
      message: '连接WebSocket服务器成功',
      timestamp: Date.now()
    }));

    ws.on("message", (data) => {
      try {
        console.log(`收到客户端 ${currentClientId} 的消息:`, data.toString());
        // 解析JSON消息
        let message;
        try {
          message = JSON.parse(data.toString());
        } catch(err) {
          message = { type: 'text', content: data.toString() };
        }
        // 根据消息类型处理
        switch(message.type) {
          case 'chat':
            handleChatMessage(currentClientId, message);
            break;
          case 'ping':
            handlePingMessage(currentClientId);
            break;
          case 'broadcast':
            handleBroadcastMessage(currentClientId, message);
            break;
          default:
            handleDefaultMessage(currentClientId, message);
        }
      } catch(err) {
        console.error('处理消息时出错:', err);
        ws.send(JSON.stringify({
          type: 'error',
          message: '处理消息时发生错误'
        }));
      }
    });

    ws.on("close", (code, reason) => {
      console.log(`客户端 ${currentClientId} 断开连接，代码: ${code}, 原因: ${reason}`);
      clients.delete(clientId);

      broadcast({
        type: 'user_left',
        clientId: currentClientId,
        timestamp: Date.now()
      })
    })

    ws.on("error", (err: Error) => {
      console.error(`客户端 ${currentClientId} WebSocket错误:`, err);
    })
  });

  // 定期清理断开的连接
  setTimeout(() => {
    clients.forEach((client, clientId) => {
      if (client.readyState === WebSocket.CLOSED) {
        clients.delete(clientId)
      }
    })
  })

  // 消息回显: 客户端发送消息 → 服务器回显 → 前端展示;   作用于： 调试和心跳检测。
  function handleDefaultMessage(clientId: number, message: MessageType) {
    const client = clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify({
          type: 'echo',
          original: message,
          timestamp: Date.now()
        }));
      } catch(err) {
        console.error(`发送消息给客户端 ${clientId} 失败`, err);
      }
    }
  }

  function handleBroadcastMessage(clientId: number, message: MessageType) {
    broadcast({
      type: 'broadcast',
      from: clientId,
      content: message.content,
      timestamp: Date.now()
    });
  }

  // 心跳检测
  function handlePingMessage(clientId: number) {
    const client = clients.get(clientId);
    if (client && WebSocket.OPEN) {
       client.send(JSON.stringify({
        type: 'pong',
        timestamp: Date.now()
      }));
    }
  }
  // 消息处理函数
  function handleChatMessage(clientId: number, message: MessageType) {
    const response = {
      type: 'chat',
      from: clientId,
      content: message.content,
      timestamp: Date.now()
    }
    // 如果有指定接收者
    if (message.to) {
      const targetClient = clients.get(message.to);
      if (targetClient && targetClient.readyState === WebSocket.OPEN) {
        // 
        targetClient.send(JSON.stringify(response));
      }
    } else {
      // 广播消息
      broadcast(response);
    }
  }

  // 广播消息给所有客户端
  function broadcast<T>(message: T) {
    const messageStr = JSON.stringify(message);
    clients.forEach((client, clientId) => {
      if (client.readyState ===  WebSocket.OPEN) {
        client.send(messageStr)
      }
    })
  }
}


export default createWebSocket