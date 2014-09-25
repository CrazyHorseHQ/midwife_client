SmartClient.ResetPasswordRoute = Ember.Route.extend({
  model: function(params) {
    var model = this.get('store').createRecord('reset_password', {
      id: params.token
    });
    model.transitionTo('saved');
    return model;
  }
});

