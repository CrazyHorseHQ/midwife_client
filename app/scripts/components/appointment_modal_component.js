SmartClient.AppointmentModalComponent = Ember.Component.extend({
  formattedDate: function () {
    return moment(this.get('model.date')).format('dddd, Do MMMM YYYY')
  }.property('model.date'),

  actions: {
    updateAppointment: function () {
      var self = this,
          model = self.get('model')

      model.setProperties({
        date: this.get('selectedDate'),
        time: this.get('time'),
        service_provider: this.get('service_provider'),
      });

      model.save().then(function () {
        self.get('aptComponent').sendAction('closeAppointmentModal')
        self.get('aptComponent').toggleProperty('forceToggle')
      });
    }
  }
});
