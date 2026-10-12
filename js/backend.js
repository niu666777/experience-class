(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(root); }
  else { root.App = root.App || {}; Object.assign(root.App, factory(root)); }
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  function getConfig() {
    return (root && root.App && root.App.CONFIG) || {};
  }

  function getFetch() {
    if (typeof fetch === 'function') { return fetch; }
    if (typeof self !== 'undefined' && typeof self.fetch === 'function') { return self.fetch; }
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') { return window.fetch; }
    return null;
  }

  function buildHeaders() {
    var cfg = getConfig();
    var key = cfg.SUPABASE_ANON_KEY || '';
    return {
      'apikey': key,
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    };
  }

  function uuid() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function submitRegistration(payload) {
    var f = getFetch();
    var cfg = getConfig();
    if (!f || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
      return Promise.resolve({ skipped: true });
    }
    return f(cfg.SUPABASE_URL + '/rest/v1/registrations', {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) { throw new Error('submit failed ' + res.status + ': ' + t); });
      }
      return { ok: true };
    });
  }

  function recordResultChoice(id, choice) {
    var f = getFetch();
    var cfg = getConfig();
    if (!f || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || !id) {
      return Promise.resolve({ skipped: true });
    }
    return f(cfg.SUPABASE_URL + '/rest/v1/registrations?id=eq.' + encodeURIComponent(id), {
      method: 'PATCH',
      headers: buildHeaders(),
      body: JSON.stringify({ result_choice: choice })
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) { throw new Error('update failed ' + res.status + ': ' + t); });
      }
      return { ok: true };
    });
  }

  return { uuid: uuid, submitRegistration: submitRegistration, recordResultChoice: recordResultChoice };
});
