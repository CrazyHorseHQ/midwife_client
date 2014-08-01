SmartClient.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://127.0.0.1:5000',
  /*
  headers: function() {
    return {
      "API_KEY": this.get("session.authToken"),
      "ANOTHER_HEADER": "Some header value"
    };
  }.property("session.authToken")
  */
});
