(function (window) {
  var G = window.AAAGym;

  function messageFrom(data, fallback) {
    if (!data) return fallback;
    if (Array.isArray(data.message)) return data.message.join(', ');
    return data.message || data.error || fallback;
  }

  G.imageUrl = function (path) {
    if (!path) return G.fallbackImg;
    if (/^https?:\/\//i.test(path)) return path;
    var clean = String(path).replace(/^\.\//, '').trim();
    if (clean.startsWith('images/') && G.apiBase) {
      return G.apiBase + '/' + clean;
    }
    return G.fallbackImg;
  };

  G.request = async function (path, options) {
    options = options || {};
    var headers = Object.assign({}, options.headers || {});
    var token = window.localStorage.getItem('access_token');
    if (token) headers.Authorization = 'Bearer ' + token;
    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    var response = await fetch(G.apiBase + path, Object.assign({}, options, { headers: headers }));
    var data = null;
    var text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { message: text };
      }
    }

    if (!response.ok) {
      var error = new Error(messageFrom(data, 'Request failed'));
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  };
})(window);
