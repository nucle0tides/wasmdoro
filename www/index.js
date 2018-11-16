import { WasmdoroTimer } from "wasmdoro";
import { Modal } from 'materialize-css';

const timer = WasmdoroTimer.new();
const rendered_timer = document.getElementById('timer');
const start_button = document.getElementById('start');
const reset_button = document.getElementById('reset');
let countdown = null,
    interval = 1000;
const statsModal = document.getElementById('stats');
Modal.init(statsModal, {onOpenStart: () => {
  updateStats();
}});
const infoModal = document.getElementById('info-modal');
console.log(infoModal);
Modal.init(infoModal, {});
const alarm = new Audio('assets/audio/alarm.wav');

start_button.addEventListener('click', () => {
  if (!timer.inprogress_pomodoro()) {
    if (countdown !== null) return;

    timer.start_pomodoro();
    disableStart();

    countdown = setInterval(() => {
      renderTimer();
      if (timer.times_up()) {
        timer.successful_pomodoro();
        enableStart();
        renderTimer();
        updateStats();
        clearInterval(countdown);
        countdown = null;
        alarm.play();
        return;
      }
      timer.decrement_time();
    }, interval);
  }
  return;
});

reset_button.addEventListener('click', () => {
  if (timer.inprogress_pomodoro()) {
    clearInterval(countdown);
    countdown = null;
    timer.reset_pomodoro();
    renderTimer();
    enableStart();
  }
  return;
});

const disableStart = () => {
  start_button.className = 'btn-large disabled';
};

const enableStart = () => {
  start_button.className = 'btn-large green darken-1';
};

const renderTimer = () => {
  rendered_timer.innerHTML = timer.render();
};

const updateStats = () => {
  document.getElementById('pomos-completed').innerHTML = timer.pomodoro_count();
  document.getElementById('total-time').innerHTML = timer.total_time();
};

renderTimer();

