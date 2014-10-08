SmartClient.ServiceOptionsController = Ember.ObjectController.extend({
  selectedServiceOptionId: null,

  actions: {
    serviceOptionSelected: function (so_id) {
      var prefix = this.get('routeContext');
      this.transitionToRoute(prefix + 'service_option', so_id)
    },
  }
});
