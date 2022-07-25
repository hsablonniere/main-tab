const bc = new BroadcastChannel('websocket');

const ws = new WebSocket('ws://localhost:8081');
// ws.addEventListener('open', console.log);
ws.addEventListener('message', (e) => {
  bc.postMessage(e.data);
});
ws.addEventListener('error', console.error);
