SmartClient.ResetPasswordRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('reset-password', params.reset-password_id);
  }
});

