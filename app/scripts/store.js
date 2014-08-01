SmartClient.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://127.0.0.1:5000',
  headers: function() {
    return {
      "AUTH_TOKEN": localStorage.getItem('authToken'),
    };
  }.property()
});
