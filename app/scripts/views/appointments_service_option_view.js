SmartClient.AppointmentsServiceOptionView = Ember.View.extend({
  service_option: null,
  showClinics: false,
  isSelected: function() {
    return this.get('controller.selectedServiceOption') == this.get('service_option');
  }.property('controller.selectedServiceOption')
});
