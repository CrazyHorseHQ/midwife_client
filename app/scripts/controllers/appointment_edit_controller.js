SmartClient.AppointmentEditController = Ember.ObjectController.extend({
  needs: 'appointment',
  content: {},
  visit_types: [
    {id: 'ante-natal', name: 'Ante-Natal'},
    {id: 'post-natal', name: 'Post-Natal'}
  ],
  priorities: [
    {id: 'other', name: 'Other'},
    {id: 'emergency', name: 'Emergency'}
  ],

  actions: {
    submit: function(){
      self = this
      model = self.get('model')

      model.save().then(function () {
        self.transitionToRoute('appointment', model);
      }, function () {});
    }
  }
});

