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

  actions: {
    save: function(){
      var self = this
      var model = self.get('model')

      model.save().then(function () {
        Ember.$('#su_success').show()
        self.transitionToRoute('service_user', model);
      }, function () {});
    },
    savePregnancy: function(pregnancyId) {
      var self = this
      var model = self.store.all('pregnancy').findBy('id', pregnancyId)

      model.save().then(function () {
        Ember.$('#su_success').show()
        self.transitionToRoute('service_user', self.get('model'));
      }, function () {});
    },
    saveBaby: function(babyId) {
      var self = this
      var model = self.store.all('baby').findBy('id', babyId)
      // Need to be set for validation reasons
      model.set('service_user', self.get('model'))

      model.save().then(function () {
        Ember.$('#su_success').show()
        self.transitionToRoute('service_user', self.get('model'));
      }, function () {});
    },
    close: function () {
      Ember.$('#su_success').hide()
    },
    new_appointment: function (su_id) {
      //local storage of su_id to retrieve later for booking
      this.transitionToRoute('service_options')
    }
  }
});
