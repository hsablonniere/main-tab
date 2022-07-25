import { createServer } from 'http';
import ws from 'ws';

const WebSocketServer = ws.Server;

const server = createServer();
const wss = new WebSocketServer({ server });

const allClients = new Set();

wss.on('connection', function connection (ws) {

  console.log('connected');
  allClients.add(ws);

  ws.on('message', function incoming (message) {
    console.log('received: %s', message);
  });

  ws.on('close', function close () {
    allClients.delete(ws);
    console.log('disconnected');
  });

});

setInterval(() => {

  const randomString = Math.random().toString(36).slice(2, 8);

  console.log(`send ${randomString} to ${allClients.size} clients`)

  Array
    .from(allClients)
    .forEach((ws) => ws.send(randomString));

}, 1000);

server.listen(8081);
