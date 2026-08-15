(function (window) {
  var G = window.AAAGym;

  G.getToken = function () {
    return window.localStorage.getItem('access_token');
  };

  G.readUser = function () {
    var token = G.getToken();
    if (!token) return null;
    try {
      var payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        G.logout(true);
        return null;
      }
      return payload;
    } catch (err) {
      return null;
    }
  };

  G.requireRole = function (role) {
    var user = G.readUser();
    if (!user) {
      window.location.href = G.root + '/common/login.html';
      return null;
    }
    if (role && user.role !== role) {
      window.location.href =
        user.role === 'gym_owner' ? G.root + '/owner/add.html' : G.root + '/user/gym_lst.html';
      return null;
    }
    return user;
  };

  G.logout = function (silent) {
    window.localStorage.removeItem('access_token');
    if (!silent) window.location.href = G.root + '/common/login.html';
  };

  G.visitList = function () {
    try {
      return JSON.parse(window.localStorage.getItem('gymVisitList') || '[]');
    } catch (err) {
      return [];
    }
  };

  G.saveVisitList = function (list) {
    window.localStorage.setItem('gymVisitList', JSON.stringify(list));
  };

  G.toggleVisit = function (gymId) {
    var list = G.visitList();
    var id = Number(gymId);
    var index = list.indexOf(id);
    if (index === -1) {
      list.push(id);
      G.saveVisitList(list);
      return true;
    }
    list.splice(index, 1);
    G.saveVisitList(list);
    return false;
  };
})(window);
