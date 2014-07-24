SmartClient.ServiceProvidersController = Ember.ObjectController.extend({
  actions: {
    activate: function (model) {
      model.toggleProperty('active');
      model.save()
    }
  }
});
