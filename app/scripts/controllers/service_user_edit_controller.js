SmartClient.ServiceUserEditController = Ember.ObjectController.extend({
  needs: 'service_user',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.service_user.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('service_user',this.get('model'));
    }
  }
});

