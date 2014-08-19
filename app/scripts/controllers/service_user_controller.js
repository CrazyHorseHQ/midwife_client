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
    }
  }
});
