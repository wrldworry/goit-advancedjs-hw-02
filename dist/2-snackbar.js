import './assets/styles-DC2Stjp5.js';
import { i as m } from './assets/vendor-BbbuE1sJ.js';
const n = document.querySelector('.form');
n.addEventListener('submit', e => {
  e.preventDefault();
  const s = new FormData(n),
    o = Number(s.get('delay')),
    i = s.get('state');
  c(o, i)
    .then(t => {
      const r = `✅ Fulfilled promise in ${t}ms`;
      console.log(r),
        m.success({
          title: 'Success',
          message: `Fulfilled promise in ${t}ms`,
          position: 'topRight',
        });
    })
    .catch(t => {
      const r = `❌ Rejected promise in ${t}ms`;
      console.log(r),
        m.error({
          title: 'Error',
          message: `Rejected promise in ${t}ms`,
          position: 'topRight',
        });
    });
});
function c(e, s) {
  return new Promise((o, i) => {
    setTimeout(() => {
      s === 'fulfilled' ? o(e) : i(e);
    }, e);
  });
}
//# sourceMappingURL=2-snackbar.js.map
