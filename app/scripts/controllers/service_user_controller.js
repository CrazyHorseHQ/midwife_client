SmartClient.ServiceUserController = Ember.ObjectController.extend({
  home_types: [
    {value: 'house', label: 'house'},
    {value: 'apartment', label: 'apartment'},
    {value: 'mobile home', label: 'mobile home'}
  ],
  home_counties: [
    {value: 'Dublin', label: 'Dublin'},
    {value: 'Wicklow', label: 'Wicklow'}
  ],
  rhesus_types: [
    {label: 'Positive', value: true},
    {label: 'Negative', value: false}
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

      var dd = Ember.$('#delivery_date').val()
      var dt = Ember.$('#delivery_time').val()

      model.set('delivery_date_time', moment(dd + 'T' + dt).format('YYYY-MM-DD HH:mm:ss'))

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
