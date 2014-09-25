SmartClient.ResetPasswordsController = Ember.ObjectController.extend({
  actions: {
    submit: function() {
      var self = this;
      var new_reset_pwd = this.store.createRecord('reset_password', {
        username: self.get('username'),
        email: self.get('email')
      });

      new_reset_pwd.save().then(function () {
        self.set('errorMessages', [])
        self.setProperties({
          'username': '',
          'email': ''
        })

        self.transitionToRoute('application');
      }, function (resp) {
        self.setErrors(resp, "rp_errors", new_service_provider)
      });
    }
  },
});

