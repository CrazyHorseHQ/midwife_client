SmartClient.ServiceProvidersController = Ember.ObjectController.extend({
  needs: ["application"],

  actions: {
    activate: function (model) {
      model.toggleProperty('active');
      model.save()
    }
  }
});
