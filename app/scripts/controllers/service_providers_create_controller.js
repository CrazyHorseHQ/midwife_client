SmartClient.ServiceProvidersCreateController = Ember.ObjectController.extend({
  errorMessages: [],

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
        var errorArray = []
        Ember.$.each(resp.errors, function (key, value) {
          errorArray.push({
            key: key,
            value: value
          })
        })

        self.set('errorMessages', errorArray)
        new_service_provider.deleteRecord()
        Ember.$('html, body').animate({
          scrollTop: Ember.$("#sp_errors").offset().top - 80
        }, 500);
      });
    }
  }
});
