const size = Number(new URL(location.href).searchParams.get('size') ?? '2');
const count = size * size;

document.body.style.setProperty('--size', size);

document.body.innerHTML += `
  <div class="iframe-wrapper">
    <iframe src="./example.html?t=${new Date().getTime()}"></iframe>
  </div>
`.repeat(count);

// setInterval(() => {
//   const index = Math.floor(Math.random() * count);
//   const iframe = Array.from(document.querySelectorAll('iframe'))[index];
//   iframe.src = './example.html?t=' + new Date().getTime();
// }, 1200);
