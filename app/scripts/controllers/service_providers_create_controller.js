SmartClient.ServiceProvidersCreateController = Ember.ObjectController.extend({
  needs: 'service_provider',
  actions: {
    submit: function () {
      log(this.get('model'))
    }
  }
});
