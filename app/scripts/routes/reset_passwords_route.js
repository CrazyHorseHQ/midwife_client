SmartClient.ResetPasswordsRoute = Ember.Route.extend({
  model: function() {
    return {};
  },
  renderTemplate: function () {
    this.render('reset_passwords', {
      into: 'application',
      outlet: 'full_column'
    })
  }
});

