SmartClient.ApplicationRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    return [
      {label: 'Service Providers', resource: 'service_providers'},
      {label: 'Appointments', resource: 'appointments'},
      {label: 'Service Users', resource: 'service_users'},
      {label: 'Tags', resource: 'tags'}
    ];
  },

  destroySession: function(){
    var self = this;
    // Unload all the important models.
    ['serviceUser', 'serviceProvider', 'appointment'].forEach(function(type) {
      self.store.unloadAll(type);
    });
    localStorage.clear();
    self.transitionTo('login');
  },

  actions: {
    search: function (keyword) {
      if (keyword) {
        this.transitionTo('results', keyword)
      } else {
        alert("Please type a hospital number, date of birth or name")
      }
    },
    logout: function() {
      var self = this;
      this.store.createRecord('logout').save().then(function(result){
        this.destroySession();
      });
    },
    error: function(error, transition){
      if (error.status == 401) {
        this.destroySession();
      }
    },
  }
});
