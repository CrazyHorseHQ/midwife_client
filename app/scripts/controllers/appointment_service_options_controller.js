SmartClient.AppointmentServiceOptionsController = Ember.ArrayController.extend({
  needs: ['appointment'],

  // TODO FIXME do a better way of separating this two.
  selectedServiceOptions: (function() {
    var ids = this.get('content');
    return this.get('allServiceOptions').filter(function(item) {
      return ids.contains(parseInt(item.get('id')));
    })
  }).property('allServiceOptions.@each.id'),

  remainingServiceOptions: (function() {
    var ids = this.get('content');
    return this.get('allServiceOptions').filter(function(item) {
      return !ids.contains(parseInt(item.get('id')));
    })
  }).property('allServiceOptions.@each.id'),

  allServiceOptions: function() {
    return this.get('store').all('service_option');
  }.property(),

  actions: {
    add_so: function(service_option_id) {
      var self = this;
      var appointment = self.get('controllers.appointment').get('model');
      var apt_service_option = self.store.createRecord('appointment.service_option', {
        service_option_id: service_option_id,
        appointment_id: appointment.get('id')
      });
      apt_service_option.save().then(function() {
        self.transitionToRoute('appointment', appointment);
      }, function() {});
    },
    remove_so: function(service_option_id) {
      var self = this;
      // FIXME this has a really hacky feeling for me...
      var appointment = self.get('controllers.appointment').get('model');
      var appointmentServiceOptionAdapter = this.container.lookup('adapter:appointment_service_option');
      var apt_service_option = self.store.createRecord('appointment.service_option', {
        service_option_id: service_option_id,
        appointment_id: appointment.get('id')
      });
      appointmentServiceOptionAdapter.destroyRecord(self.get('store'), 'appointment_service_option', apt_service_option).then(function(){
        //Why is this not working?
        self.transitionToRoute('appointment', appointment);
      });
    },
  }
});

