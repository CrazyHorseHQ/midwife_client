SmartClient.ResetPasswordController = Ember.ObjectController.extend({
  actions: {
    submit: function() {
      var self = this;
      var set_pwd = this.get('model').setProperties({
        password: self.get('password'),
        password_verification: self.get('password_verification'),
      });

      set_pwd.save().then(function () {
        self.set('errorMessages', [])
        self.setProperties({
          'password': '',
          'password_verification': ''
        })
        // Once the password is successfully set -> go to login
        self.transitionToRoute('login');
      }, function (resp) {
        self.setErrors(resp, "rp_errors", new_service_provider)
      });
    }
  },
});

