SmartClient.ServiceOptionSelectorComponent = Ember.Component.extend({
  actions: {
    serviceOptionSelected: function (so_id) {
      this.sendAction('serviceOptionSelected', so_id)
    },
    clinicSelected: function (clinic_id) {
      this.sendAction('clinicSelected', clinic_id)
    }
  }
});
