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

new SharedWorker('./shared-worker.js');
