SmartClient.AppointmentsServiceOptionView = Ember.View.extend({
  serviceOptionId: null,
  routeCtxt: null,

  isSelected: function() {
    return this.get('controller.selectedServiceOptionId') == this.get('serviceOptionId');
  }.property('controller.selectedServiceOptionId')
});
