SmartClient.ServiceUserController = Ember.ObjectController.extend({
  home_types: [
    {id: 'house', name: 'house'},
    {id: 'apartment', name: 'apartment'},
    {id: 'mobile home', name: 'mobile home'}
  ],
  home_counties: [
    {id: 'Dublin', name: 'Dublin'},
    {id: 'Wicklow', name: 'Wicklow'}
  ],
  rhesus_types: [
    {type: 'Positive', value: true},
    {type: 'Negative', value: false}
  ],

  actions: {
    save: function(){
      var self = this
      var model = self.get('model')

      model.save().then(function () {
        Ember.$('#su_success').show()
      }, function () {
        self.setErrors(resp, "su_edit_errors")
      });
    },
    savePregnancy: function(pregnancyId) {
      var self = this
      var model = self.store.all('pregnancy').findBy('id', pregnancyId)

      model.save().then(function () {
        Ember.$('#su_success').show()
      }, function () {});
    },
    saveBaby: function(babyId) {
      var self = this
      var model = self.store.all('baby').findBy('id', babyId)
      // Need to be set for validation reasons
      model.set('service_user', self.get('model'))

      model.save().then(function () {
        Ember.$('#su_success').show()
      }, function () {});
    },
    close: function () {
      Ember.$('#su_success').hide()
    },
    new_appointment: function (su_id) {
      this.transitionToRoute('service_options')
    }
  }
});
