import './assets/styles-DC2Stjp5.js';
import { f as h, i } from './assets/vendor-BbbuE1sJ.js';
const r = document.querySelector('#datetime-picker'),
  n = document.querySelector('[data-start]'),
  y = document.querySelector('[data-days]'),
  p = document.querySelector('[data-hours]'),
  S = document.querySelector('[data-minutes]'),
  D = document.querySelector('[data-seconds]');
let s = null,
  u = null;
n.disabled = !0;
const T = {
  enableTime: !0,
  time_24hr: !0,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(e) {
    const t = e[0];
    t && t <= new Date()
      ? (i.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight',
        }),
        (n.disabled = !0),
        (s = null))
      : t && ((s = t), (n.disabled = !1));
  },
};
h(r, T);
function b(e) {
  const d = Math.floor(e / 864e5),
    l = Math.floor((e % 864e5) / 36e5),
    m = Math.floor(((e % 864e5) % 36e5) / 6e4),
    f = Math.floor((((e % 864e5) % 36e5) % 6e4) / 1e3);
  return { days: d, hours: l, minutes: m, seconds: f };
}
function o(e) {
  return String(e).padStart(2, '0');
}
function c(e) {
  (y.textContent = o(e.days)),
    (p.textContent = o(e.hours)),
    (S.textContent = o(e.minutes)),
    (D.textContent = o(e.seconds));
}
function g() {
  s &&
    ((n.disabled = !0),
    (r.disabled = !0),
    (u = setInterval(() => {
      const t = s - new Date();
      if (t <= 0) {
        clearInterval(u),
          c({ days: 0, hours: 0, minutes: 0, seconds: 0 }),
          (r.disabled = !1),
          i.success({
            title: 'Completed',
            message: 'Timer has finished!',
            position: 'topRight',
          });
        return;
      }
      const a = b(t);
      c(a);
    }, 1e3)));
}
n.addEventListener('click', g);
//# sourceMappingURL=1-timer.js.map
