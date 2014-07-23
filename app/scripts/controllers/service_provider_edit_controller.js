SmartClient.ServiceProviderEditController = Ember.ObjectController.extend({
  needs: 'service_provider',
  actions: {
    save: function(){
      self = this
      model = self.get('controllers.service_provider.model')
      this.get('buffer').forEach(function(attr){
        model.set(attr.key, attr.value);
      });

      model.save().then(function () {
        self.transitionToRoute('service_provider', model);
      }, function () {});
    }
  }
});
