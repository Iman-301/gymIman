(function () {
  var role = /\/owner\//.test(location.pathname) ? 'gym_owner' : 'gym_user';
  var user = AAAGym.requireRole(role);
  if (!user) return;
  AAAGym.mountChrome({ role: role, active: 'account' });

  function paint(data) {
    document.getElementById('hello').textContent = data.username;
    document.getElementById('username').textContent = data.username;
    document.getElementById('email').textContent = data.email;
  }
  paint(user);

  AAAGym.request('/auth/me').then(paint).catch(function () {});

  document.querySelector('[data-edit="username"]').addEventListener('click', async function () {
    var value = await AAAGym.promptField('Username', 'New username', document.getElementById('username').textContent);
    if (!value) return;
    try {
      var data = await AAAGym.request('/auth/change-username', { method: 'PATCH', body: JSON.stringify({ username: value }) });
      paint(data);
      AAAGym.toast('Username updated', 'ok');
    } catch (err) { AAAGym.toast(err.message, 'err'); }
  });
  document.querySelector('[data-edit="email"]').addEventListener('click', async function () {
    var value = await AAAGym.promptField('Email', 'New email', document.getElementById('email').textContent, 'email');
    if (!value) return;
    try {
      var data = await AAAGym.request('/auth/change-email', { method: 'PATCH', body: JSON.stringify({ email: value }) });
      paint(data);
      AAAGym.toast('Email updated', 'ok');
    } catch (err) { AAAGym.toast(err.message, 'err'); }
  });
  document.querySelector('[data-edit="password"]').addEventListener('click', async function () {
    var value = await AAAGym.promptField('Password', 'New password (8+)', '', 'password');
    if (!value) return;
    try {
      await AAAGym.request('/auth/change-password', { method: 'PATCH', body: JSON.stringify({ password: value }) });
      AAAGym.toast('Password updated', 'ok');
    } catch (err) { AAAGym.toast(err.message, 'err'); }
  });
  document.getElementById('logout').addEventListener('click', function () {
    AAAGym.logout();
  });
  document.getElementById('delete').addEventListener('click', async function () {
    if (!confirm('Delete this account permanently?')) return;
    try {
      await AAAGym.request('/auth/delete-account', { method: 'DELETE' });
      AAAGym.logout();
    } catch (err) { AAAGym.toast(err.message, 'err'); }
  });
})();
