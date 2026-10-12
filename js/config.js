(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    CONFIG: {
      SUPABASE_URL: 'https://oumrncnydecojatdprcq.supabase.co',
      SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bXJuY255ZGVjb2phdGRwcmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzI0MDcsImV4cCI6MjEwNzM0ODQwN30.m4g-Xes9YY_CHTL9nKwn7VEX7ezB1pOeuU_5KbLobPU'
    }
  };
});
