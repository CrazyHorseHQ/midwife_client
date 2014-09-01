SmartClient.ServiceProvidersController = Ember.ArrayController.extend({
  needs: ["application"],
  itemController: "serviceProvider",
  sortProperties: ["name"],
  sortAscending: true,

  actions: {
    activate: function (model) {
      if (this.get('controllers.application.currentUser.admin')) {
        model.toggleProperty('active');
        model.save();
      }
    }
  }
});
