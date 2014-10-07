SmartClient.ServiceProviderController = Ember.ObjectController.extend({
  needs: "application",

  actions: {
    save: function(){
      if (this.get('controllers.application.currentUser.admin')) {
        var self = this
        var model = self.get('model')

        model.save().then(function () {
          Ember.$('#sp_success').show()
          self.transitionToRoute('service_provider', model);
        }, function (resp) {
          self.setErrors(resp, "sp_edit_errors")
        });
      }
    },
    close: function () {
      Ember.$('#sp_success').hide()
    },
    activate: function (model) {
      if (this.get('controllers.application.currentUser.admin')) {
        model.toggleProperty('active');
        model.save();
      }
    }
  }
});
