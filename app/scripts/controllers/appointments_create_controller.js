SmartClient.AppointmentsCreateController = Ember.ObjectController.extend({
  needs: 'appointment',
  visit_types: [
    {id: 'ante-natal', name: 'Ante-Natal'},
    {id: 'post-natal', name: 'Post-Natal'}
  ],
  priorities: [
    {id: 'other', name: 'Other'},
    {id: 'emergency', name: 'Emergency'}
  ],

  actions: {
    submit: function () {
      var self = this
      var sp = self.get('store').getById('service_provider', self.get('service_provider_id'));
      var su = self.get('store').getById('service_user', self.get('service_user_id'));

      var new_apt = this.get('model').setProperties({
        date: self.get('date'),
        time: self.get('time'),
        service_provider: sp,
        service_user: su,
        priority: self.get('priority'),
        visit_type: self.get('visit_type')
      });

      new_apt.save().then(function () {
        self.transitionToRoute('appointments');
      }, function () {
        new_apt.deleteRecord()
      });
    }
  }
});
