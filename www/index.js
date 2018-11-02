import { WasmdoroTimer } from "wasmdoro";

const timer = WasmdoroTimer.new();
const rendered_timer = document.getElementById('timer');
const start_button = document.getElementById('start');
const reset_button = document.getElementById('reset');
let countdown = null,
    interval = 1000;

start_button.addEventListener('click', () => {
  if (!timer.inprogress_pomodoro()) {
    if (countdown !== null) return;

    start_button.innerHTML = 'Stop';
    start_button.className = 'btn-large disabled';

    countdown = setInterval(() => {
      if (timer.times_up()) {
        clearInterval(countdown);
        countdown = null;
        timer.successful_pomodoro();
        return;
      }
      timer.start_pomodoro();
      document.getElementById('timer').innerHTML = timer.render();
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
    document.getElementById('timer').innerHTML = timer.render();

    start_button.innerHTML = 'Start';
    start_button.className = 'btn-large green darken-1';
  }
  return;
});

rendered_timer.innerHTML = timer.render();

