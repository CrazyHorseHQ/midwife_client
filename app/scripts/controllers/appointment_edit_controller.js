SmartClient.AppointmentEditController = Ember.ObjectController.extend({
  needs: 'appointment',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.appointment.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('appointment',this.get('model'));
    }
  }
});

