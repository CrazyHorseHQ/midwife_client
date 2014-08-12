SmartClient.AppointmentEditController = Ember.ObjectController.extend({
  needs: 'appointment',
  content: {},

  actions: {
    save: function(){
      self = this
      model = self.get('controllers.appointment.model')
      this.get('buffer').forEach(function(attr){
        model.set(attr.key, attr.value);
      });

      model.save().then(function () {
        self.transitionToRoute('appointment', model);
      }, function () {});
    }
  }
});

