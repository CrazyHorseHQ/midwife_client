SmartClient.ServiceProviderController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      var self = this
      var model = self.get('model')

      model.save().then(function () {
        Ember.$('#sp_success').show()
        self.transitionToRoute('service_provider', model);
      }, function () {});
    },
    close: function () {
      Ember.$('#sp_success').hide()
    }
  }
});
