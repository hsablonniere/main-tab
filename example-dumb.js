try {
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

  function displayString (e) {
    $a.textContent = e.data;
  }

  const wsUrl = new URL(location.href);
  wsUrl.protocol = 'ws:';
  wsUrl.port = '8081';
  wsUrl.pathname = '/';
  console.log(wsUrl);

  const ws = new WebSocket(wsUrl);

  // ws.addEventListener('open', console.log);
  ws.addEventListener('message', (e) => {
    displayString(e);
  });
  ws.addEventListener('error', console.error);

}
catch (e) {
  document.body.innerHTML += e.message;
}
