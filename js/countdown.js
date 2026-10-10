(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULT_SECONDS = 60;

  function formatCountdownLabel(remaining) {
    return '请' + remaining + 's后重试';
  }

  class Countdown {
    constructor(opts) {
      opts = opts || {};
      this.onTick = opts.onTick || function () {};
      this.onDone = opts.onDone || function () {};
      this.setIntervalFn = opts.setIntervalFn || setInterval;
      this.clearIntervalFn = opts.clearIntervalFn || clearInterval;
      this._timer = null;
      this._remaining = 0;
    }

    start(seconds) {
      this.cancel();
      this._remaining = (seconds == null) ? DEFAULT_SECONDS : seconds;
      if (this._remaining <= 0) {
        this._remaining = 0;
        return;
      }
      this.onTick(this._remaining);
      this._timer = this.setIntervalFn(() => {
        if (this._timer == null) { return; }
        this._remaining -= 1;
        if (this._remaining <= 0) {
          this._stop();
          this.onDone();
        } else {
          this.onTick(this._remaining);
        }
      }, 1000);
    }

    cancel() {
      this._stop();
    }

    isRunning() {
      return this._timer != null;
    }

    _stop() {
      if (this._timer != null) {
        this.clearIntervalFn(this._timer);
        this._timer = null;
      }
    }
  }

  return { formatCountdownLabel, Countdown };
});
