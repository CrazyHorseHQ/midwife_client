SmartClient.ServiceProvidersCreateController = Ember.ObjectController.extend({
  actions: {
    submit: function () {
      var self = this

      var new_service_provider = this.store.createRecord('service_provider', {
        username: self.get('username'),
        name: self.get('name'),
        email: self.get('email'),
        password: self.get('password'),
        job_occupation: self.get('job_occupation'),
        job_level: self.get('job_level'),
        primary_phone: self.get('primary_phone'),
        secondary_phone: self.get('secondary_phone')
      });

      new_service_provider.save().then(function () {
        self.set('errorMessages', [])
        self.setProperties({
          'username': '',
          'name': '',
          'email': '',
          'password': '',
          'job_occupation': '',
          'job_level': '',
          'primary_phone': '',
          'secondary_phone': ''
        })

        self.transitionToRoute('service_providers');
      }, function (resp) {
        self.setErrors(resp, "sp_errors", new_service_provider)
      });
    }
  }
});
