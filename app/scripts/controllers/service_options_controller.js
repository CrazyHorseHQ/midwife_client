SmartClient.ServiceOptionsController = Ember.ObjectController.extend({
  selectedServiceOptionId: null,

  actions: {
    serviceOptionSelected: function (so_id) {
      this.transitionToRoute(this.get('routeContext') + 'service_option', so_id)
    },
    clinicSelected: function (clinic_id) {
      this.transitionToRoute(this.get('routeContext') + 'clinic', clinic_id)
    }
  }
});
