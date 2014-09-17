SmartClient.AppointmentsView = Ember.View.extend({
  dateToday: function() {
    return this.get('controller.selectedDate');
  }.property('controller.selectedDate'),

  dateYesterday: function() {
    return moment(this.get('dateToday'), "YYYY-MM-DD").subtract(1, 'days').format('YYYY-MM-DD');
  }.property('dateToday'),

  dateTomorrow: function() {
    return moment(this.get('dateToday'), "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
  }.property('dateToday'),

  showAppointments: function() {
    return this.get('controller.selectedClinic') && this.get('controller.selectedServiceOption');
  }.property('controller.selectedClinic', 'controller.selectedServiceOption'),
});
