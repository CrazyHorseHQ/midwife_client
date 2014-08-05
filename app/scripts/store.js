SmartClient.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://127.0.0.1:5000'
});

// Add the headers
SmartClient.ApplicationAdapter.reopen({
  headers: {
    "AUTH_TOKEN": localStorage.getItem('authToken'),
  }
});
