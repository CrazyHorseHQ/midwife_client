SmartClient.ResetPasswordsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('reset-password');
  }
});

