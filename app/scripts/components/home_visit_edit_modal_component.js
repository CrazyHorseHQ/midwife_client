SmartClient.HomeVisitEditModalComponent = Ember.Component.extend({
  formattedDate: function () {
    return moment(this.get('model.date')).format('dddd, Do MMMM YYYY')
  }.property('model.date'),

  actions: {
    updateAppointment: function () {
      var self = this,
          model = self.get('model'),
          sp = this.get('service_providers').findBy('id', this.get('selected_sp').get('id'));

      model.setProperties({
        date: this.get('selectedDate'),
        service_provider: sp,
      });

      model.save().then(function () {
        self.get('aptComponent').sendAction('closeModal');
        self.get('aptComponent').notifyPropertyChange('appointments');
      });
    }
  }
});
