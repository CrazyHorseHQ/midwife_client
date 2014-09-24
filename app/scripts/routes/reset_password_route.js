SmartClient.ResetPasswordRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('reset_password', params.reset_password_id);
  }
});

