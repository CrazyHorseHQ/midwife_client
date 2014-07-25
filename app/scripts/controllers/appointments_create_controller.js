SmartClient.AppointmentsCreateController = Ember.ObjectController.extend({
  needs: 'appointment',
  visit_typeL: ['ante-natal', 'post-natal'],

  actions: {
    submit: function () {
      var self = this

      var new_apt = this.store.createRecord('appointment', {
        appointment_category_id: self.get('appointment_category_id'),
        date: self.get('date'),
        time: self.get('time'),
        service_provider_id: self.get('service_provider_id'),
        service_user_id: self.get('service_user_id'),
        priority: self.get('priority'),
        visit_type: self.get('visit_type')
      });

      new_apt.save().then(function () {
        self.set('appointment_category_id', '')
        self.set('date', '')
        self.set('time', '')
        self.set('service_provider_id', '')
        self.set('service_user_id', '')
        self.set('priority', '')
        self.set('visit_type', '')
        self.transitionToRoute('appointments');
      }, function () {
        new_apt.deleteRecord()
      });
    }
  }
});