SmartClient.LoginRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('Login');
  }
});

