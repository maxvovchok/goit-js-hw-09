const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const changeBackgroundColor = {
  interval: null,

  start() {
    btnStart.disabled = true;
    btnStop.disabled = false;

    this.interval = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.interval);
    btnStop.disabled = true;
    btnStart.disabled = false;
  },
};

btnStart.addEventListener('click', () => {
  changeBackgroundColor.start();
});

btnStop.addEventListener('click', () => {
  changeBackgroundColor.stop();
});
