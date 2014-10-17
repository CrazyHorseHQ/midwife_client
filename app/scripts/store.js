SmartClient.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: '@@host'
});

// Add the headers
SmartClient.ApplicationAdapter.reopen({
  headers: {
    'Auth-Token': localStorage.getItem('authToken'),
    'Api-Key': SmartClient.Config.apiKey
  }
});
