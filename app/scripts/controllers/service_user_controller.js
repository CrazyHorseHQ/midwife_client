SmartClient.ServiceUserController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      var self = this
      var model = self.get('model')

      model.save().then(function () {
        Ember.$('#su_success').show()
        self.transitionToRoute('service_user', model);
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
