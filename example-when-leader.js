import { whenLeader } from './when-leader.js';

document.body.animate(
  [
    { backgroundColor: '#fff' },
    { backgroundColor: '#ddd' },
    { backgroundColor: '#fff' },
  ],
  {
    duration: 200,
    fill: 'forwards',
  },
);

const $a = document.querySelector('a');
const bc = new BroadcastChannel('websocket');

function displayString (e) {
  $a.textContent = e.data;
}

bc.addEventListener('message', (e) => {
  displayString(e);
});

const namespace = new URL(location.href).searchParams.get('namespace') ?? 'default';
whenLeader(namespace).then(() => {
  document.body.style.border = '1em solid lime';
  document.head.querySelector('title').textContent += ' LEADER';

  const wsUrl = new URL(location.href);
  wsUrl.protocol = 'ws:';
  wsUrl.port = '8081';
  wsUrl.pathname = '/';

  const ws = new WebSocket(wsUrl);
  // ws.addEventListener('open', console.log);
  ws.addEventListener('message', (e) => {
    bc.postMessage(e.data);
    displayString(e);
  });
  ws.addEventListener('error', console.error);
});
