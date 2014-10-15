SmartClient.AppointmentModalComponent = Ember.Component.extend({
  formattedDate: function () {
    return moment(this.get('model.date')).format('dddd, Do MMMM YYYY')
  }.property('model.date'),

  filteredTimes: function() {
    var times = this.get('times').filter(function(time) {
      return Ember.isEmpty(time.get('appointment'));
    });
    times.push(Ember.Object.create({
      time: this.get('selected_time')
    }));
    return times.sortBy('time');
  }.property('times'),

  actions: {
    updateAppointment: function () {
      var self = this,
          model = self.get('model'),
          sp = this.get('service_providers').findBy('id', this.get('selected_sp').get('id'));

      model.setProperties({
        //date: this.get('selectedDate'),
        time: this.get('selected_time'),
        service_provider: sp,
      });

      model.save().then(function () {
        self.get('aptComponent').sendAction('closeModal')
        self.get('aptComponent').toggleProperty('forceToggle')
      });
    }
  }
});
