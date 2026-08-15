(function () {
  var user = AAAGym.requireRole('gym_owner');
  if (!user) return;
  AAAGym.mountChrome({ role: 'gym_owner', active: 'studio' });

  var gymId = null;
  var coverInput = document.getElementById('cover');
  var preview = document.getElementById('cover-preview');

  function fieldHtml(kind, data) {
    data = data || {};
    if (kind === 'services') {
      return '<div class="repeater-item panel"><input placeholder="Service title" value="' + AAAGym.escape(data.title || '') + '"><textarea placeholder="What do they get?">' + AAAGym.escape(data.description || '') + '</textarea><button type="button" class="btn btn-ghost" data-remove>Remove</button></div>';
    }
    if (kind === 'pricing') {
      return '<div class="repeater-item panel"><input placeholder="Plan name" value="' + AAAGym.escape(data.name || '') + '"><input placeholder="Price" value="' + AAAGym.escape(data.price || '') + '"><textarea placeholder="What is included?">' + AAAGym.escape(data.detail || '') + '</textarea><button type="button" class="btn btn-ghost" data-remove>Remove</button></div>';
    }
    return '<div class="repeater-item panel"><input placeholder="Question" value="' + AAAGym.escape(data.question || '') + '"><textarea placeholder="Answer">' + AAAGym.escape(data.answer || '') + '</textarea><button type="button" class="btn btn-ghost" data-remove>Remove</button></div>';
  }

  function bindRepeater(id) {
    var root = document.getElementById(id);
    root.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.onclick = function () { btn.closest('.repeater-item').remove(); };
    });
  }

  function addRow(kind, data) {
    var root = document.getElementById(kind);
    root.insertAdjacentHTML('beforeend', fieldHtml(kind, data));
    bindRepeater(kind);
  }

  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () { addRow(btn.getAttribute('data-add')); });
  });

  coverInput.addEventListener('change', function () {
    var file = coverInput.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
  });

  function collect() {
    return {
      name: document.getElementById('name').value.trim(),
      city: document.getElementById('city').value.trim(),
      location: document.getElementById('location').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      description: document.getElementById('description').value.trim(),
      services: Array.from(document.querySelectorAll('#services .repeater-item')).map(function (row) {
        return { title: row.querySelector('input').value.trim(), description: row.querySelector('textarea').value.trim() };
      }).filter(function (item) { return item.title; }),
      pricingPlans: Array.from(document.querySelectorAll('#pricing .repeater-item')).map(function (row) {
        var inputs = row.querySelectorAll('input');
        return { name: inputs[0].value.trim(), price: inputs[1].value.trim(), detail: row.querySelector('textarea').value.trim() };
      }).filter(function (item) { return item.name; }),
      FAQs: Array.from(document.querySelectorAll('#faqs .repeater-item')).map(function (row) {
        return { question: row.querySelector('input').value.trim(), answer: row.querySelector('textarea').value.trim() };
      }).filter(function (item) { return item.question; }),
      images: []
    };
  }

  function fill(gym) {
    gymId = gym.id;
    document.getElementById('title').textContent = 'Edit ' + gym.name;
    document.getElementById('name').value = gym.name || '';
    document.getElementById('city').value = gym.city || '';
    document.getElementById('location').value = gym.location || '';
    document.getElementById('phone').value = gym.phone || '';
    document.getElementById('description').value = gym.description || '';
    document.getElementById('services').innerHTML = '';
    document.getElementById('pricing').innerHTML = '';
    document.getElementById('faqs').innerHTML = '';
    (gym.services || []).forEach(function (item) { addRow('services', item); });
    (gym.pricingPlans || []).forEach(function (item) { addRow('pricing', item); });
    (gym.FAQs || []).forEach(function (item) { addRow('faqs', item); });
    if (gym.images && gym.images[0]) {
      preview.src = AAAGym.imageUrl(gym.images[0]);
      preview.style.display = 'block';
    }
    document.getElementById('delete').hidden = false;
  }

  async function uploadCover(id) {
    if (!coverInput.files[0]) return;
    var form = new FormData();
    form.append('file', coverInput.files[0]);
    form.append('gymId', String(id));
    await AAAGym.request('/gym/upload-image', { method: 'POST', body: form });
  }

  AAAGym.request('/gym/my-gym').then(fill).catch(function () {
    addRow('services');
    addRow('pricing');
    addRow('faqs');
  });

  document.getElementById('studio-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    var payload = collect();
    if (!payload.services.length || !payload.pricingPlans.length || !payload.FAQs.length) {
      AAAGym.toast('Add at least one service, plan, and FAQ', 'err');
      return;
    }
    try {
      var gym = gymId
        ? await AAAGym.request('/gym/update/' + gymId, { method: 'PATCH', body: JSON.stringify(payload) })
        : await AAAGym.request('/gym/create', { method: 'POST', body: JSON.stringify(payload) });
      gymId = gym.id;
      await uploadCover(gymId);
      fill(await AAAGym.request('/gym/my-gym'));
      AAAGym.toast('Gym saved', 'ok');
    } catch (err) {
      AAAGym.toast(err.message || 'Could not save', 'err');
    }
  });

  document.getElementById('delete').addEventListener('click', async function () {
    if (!gymId || !confirm('Remove this gym from the register?')) return;
    try {
      await AAAGym.request('/gym/' + gymId, { method: 'DELETE' });
      gymId = null;
      document.getElementById('studio-form').reset();
      preview.style.display = 'none';
      document.getElementById('delete').hidden = true;
      document.getElementById('title').textContent = 'Publish the room';
      AAAGym.toast('Listing removed', 'ok');
    } catch (err) {
      AAAGym.toast(err.message, 'err');
    }
  });
})();
