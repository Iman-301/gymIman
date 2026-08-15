(function (window, document) {
  var G = window.AAAGym;

  G.escape = function (value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  G.toast = function (message, kind) {
    var host = document.querySelector('.toast-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    var node = document.createElement('div');
    node.className = 'toast' + (kind ? ' toast-' + kind : '');
    node.textContent = message;
    host.appendChild(node);
    setTimeout(function () {
      node.remove();
    }, 3200);
  };

  G.mountChrome = function (options) {
    options = options || {};
    var user = G.readUser();
    var role = options.role || (user && user.role) || 'guest';
    var active = options.active || '';

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<a class="brand" href="' +
      G.root +
      '/index.html">' +
      '<span class="stamp">AAA</span><span class="brand-copy"><strong>AAAGym</strong><em>the gym register</em></span></a>' +
      '<nav class="site-nav">' +
      (role === 'gym_owner'
        ? '<a class="' +
          (active === 'studio' ? 'is-active' : '') +
          '" href="' +
          G.root +
          '/owner/add.html">Studio</a>' +
          '<a class="' +
          (active === 'account' ? 'is-active' : '') +
          '" href="' +
          G.root +
          '/owner/logOut.html">Account</a>'
        : role === 'gym_user'
          ? '<a class="' +
            (active === 'explore' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/gym_lst.html">Explore</a>' +
            '<a class="' +
            (active === 'visits' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/go_checkout.html">Visits</a>' +
            '<a class="' +
            (active === 'contact' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/contact.html">Desk</a>' +
            '<a class="' +
            (active === 'account' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/log_out.html">Account</a>'
          : '<a href="' +
            G.root +
            '/common/login.html">Enter</a><a class="nav-cta" href="' +
            G.root +
            '/common/registration_page.html">Join the register</a>') +
      '</nav>';
    document.body.prepend(header);

    if (role === 'gym_user' || role === 'gym_owner') {
      var dock = document.createElement('nav');
      dock.className = 'dock';
      dock.innerHTML =
        role === 'gym_owner'
          ? '<a class="' +
            (active === 'studio' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/owner/add.html">Studio</a>' +
            '<a class="' +
            (active === 'account' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/owner/logOut.html">Account</a>'
          : '<a class="' +
            (active === 'explore' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/gym_lst.html">Home</a>' +
            '<a class="' +
            (active === 'visits' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/go_checkout.html">Visits</a>' +
            '<a class="' +
            (active === 'contact' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/contact.html">Desk</a>' +
            '<a class="' +
            (active === 'account' ? 'is-active' : '') +
            '" href="' +
            G.root +
            '/user/log_out.html">You</a>';
      document.body.appendChild(dock);
    }
  };

  G.promptField = function (title, label, initial, type) {
    return new Promise(function (resolve) {
      var overlay = document.createElement('div');
      overlay.className = 'dialog-overlay';
      overlay.innerHTML =
        '<form class="dialog"><p class="kicker">' +
        G.escape(title) +
        '</p><label>' +
        G.escape(label) +
        '<input type="' +
        (type || 'text') +
        '" value="' +
        G.escape(initial || '') +
        '" required></label><div class="dialog-actions"><button type="button" class="btn btn-ghost" data-cancel>Cancel</button><button class="btn" type="submit">Save</button></div></form>';
      document.body.appendChild(overlay);
      var input = overlay.querySelector('input');
      input.focus();
      overlay.querySelector('[data-cancel]').addEventListener('click', function () {
        overlay.remove();
        resolve(null);
      });
      overlay.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        var value = input.value.trim();
        overlay.remove();
        resolve(value || null);
      });
    });
  };
})(window, document);
