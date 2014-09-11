SmartClient.AppointmentEditController = Ember.ObjectController.extend({
  needs: 'appointment',
  content: {},
  visit_types: [
    {id: 'ante-natal', name: 'Ante-Natal'},
    {id: 'post-natal', name: 'Post-Natal'}
  ],
  priorities: [
    {id: 'scheduled', name: 'Scheduled'},
    {id: 'drop-in', name: 'Drop-In'}
  ],

  actions: {
    submit: function(){
      var self = this;

      var model = this.get('model').setProperties({
        date: self.get('date'),
        time: self.get('time'),
        priority: self.get('priority'),
        visit_type: self.get('visit_type')
      });
      if (self.get('service_provider_id')) {
        model.set('service_provider', self.get('store').getById('service_provider', self.get('service_provider_id')));
      }
      if (self.get('service_user_id')) {
        model.set('service_user', self.get('store').getById('service_user', self.get('service_user_id')));
      }


      model.save().then(function () {
        self.transitionToRoute('appointment', model);
      }, function () {});
    }
  }
});

