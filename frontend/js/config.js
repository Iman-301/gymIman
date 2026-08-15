(function (window) {
  var meta = document.querySelector('meta[name="api-base"]');
  var host = window.location.hostname;
  var local = host === 'localhost' || host === '127.0.0.1';
  var stored = window.localStorage.getItem('aaagym_api');
  var productionApi = ''; // set to your live API, e.g. 'https://aaagym-api.onrender.com'

  window.AAAGym = window.AAAGym || {};
  window.AAAGym.apiBase = (
    (meta && meta.content) ||
    stored ||
    window.AAAGym.apiBase ||
    productionApi ||
    (local ? 'http://localhost:3000' : '')
  ).replace(/\/$/, '');

  var path = window.location.pathname.replace(/\\/g, '/');
  window.AAAGym.root = /\/(user|owner|common)\//.test(path) ? '..' : '.';
  window.AAAGym.fallbackImg = window.AAAGym.root + '/img/g1.jpg';
})(window);
