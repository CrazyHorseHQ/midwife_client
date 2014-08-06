SmartClient.ServiceUserEditController = Ember.ObjectController.extend({
  needs: 'service_user',
  actions: {
    save: function(){
      self = this
      model = self.get('controllers.service_user.model')
      this.get('buffer').forEach(function(attr){
        model.set(attr.parentKey + "." + attr.key, attr.value);
      });

      model.save().then(function () {
        self.transitionToRoute('service_user', model);
      }, function () {});
    }
  }
});
