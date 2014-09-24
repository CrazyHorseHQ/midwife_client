SmartClient.ServiceOptionsController = Ember.ObjectController.extend({
  selectedServiceOptionId: null,

  actions: {
    serviceOptionSelected: function (so_id) {
      this.transitionToRoute('service_option', so_id)
    },
    clinicSelected: function (clinic_id) {
      this.transitionToRoute('clinic', clinic_id)
    }
  }
});
