SmartClient.AppointmentController = Ember.ObjectController.extend({

  // TODO FIXME do a better way of separating this two.
  selectedServiceOptions: (function() {
    var ids = this.get('model').get('service_options').mapBy('id');
    return this.get('allServiceOptions').filter(function(item) {
      return ids.contains(item.get('id'));
    })
  }).property('model.service_options.@each', 'allServiceOptions.@each'),

  remainingServiceOptions: (function() {
    var ids = this.get('model').get('service_options').mapBy('id');
    return this.get('allServiceOptions').filter(function(item) {
      return !ids.contains(item.get('id'));
    })
  }).property('model.service_options.@each', 'allServiceOptions.@each'),

  actions: {
    add_so: function(service_option_id) {
      var self = this;
      var appointment = self.get('model');
      var new_service_option = self.store.getById('service_option', parseInt(service_option_id));
      var apt_service_option = self.store.createRecord('appointment.service_option', {
        service_option_id: service_option_id,
        appointment_id: appointment.get('id')
      });
      apt_service_option.save().then(function() {
        self.get('model.service_options').pushObject(new_service_option);
      });
    },
    remove_so: function(service_option_id) {
      var self = this;
      // FIXME this has a really hacky feeling for me...
      var appointment = self.get('model');
      var appointmentServiceOptionAdapter = this.container.lookup('adapter:appointment_service_option');
      var apt_service_option = self.store.createRecord('appointment.service_option', {
        service_option_id: service_option_id,
        appointment_id: appointment.get('id')
      });
      appointmentServiceOptionAdapter.destroyRecord(self.get('store'), 'appointment_service_option', apt_service_option).then(function(){
        var service_option_to_remove = self.store.getById('service_option', parseInt(service_option_id));
        appointment.get('service_options').removeObject(service_option_to_remove);
      });
    },
    delete: function(){
      appointment = this.get('model');
      appointment.destroyRecord();
      appointment.save();

      this.transitionToRoute('appointments');
    }
  }
});

