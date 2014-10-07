SmartClient.ServiceProvidersController = Ember.ArrayController.extend({
  needs: ["application"],
  itemController: "serviceProvider",
  sortProperties: ["name"],
  sortAscending: true,

  actions: {
  }
});
