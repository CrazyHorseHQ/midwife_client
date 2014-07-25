SmartClient.ServiceProvidersCreateController = Ember.ObjectController.extend({
  actions: {
    submit: function () {
      var self = this

      var new_service_provider = this.store.createRecord('service_provider', {
        username: self.get('username'),
        name: self.get('username'),
        password: self.get('password')
      });

      new_service_provider.save().then(function () {
        self.set('username', '')
        self.set('name', '')
        self.set('password', '')
        self.transitionToRoute('service_providers');
      }, function () {
        new_service_provider.deleteRecord()
      });
    }
  }
});
