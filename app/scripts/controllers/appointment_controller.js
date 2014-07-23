SmartClient.AppointmentController = Ember.ObjectController.extend({
  // Implement your controller here.
  needs: 'appointment',
  actions: {
    delete: function(){
      appointment = this.get('model');
      appointment.destroyRecord();
      appointment.save();

      this.transitionToRoute('appointments');
    }
  }
});

