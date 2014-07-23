MidwifeClient.MidwifeEditController = Ember.ObjectController.extend({
  needs: 'midwife',
  actions: {
    save: function(){
      self = this
      model = self.get('controllers.midwife.model')
      this.get('buffer').forEach(function(attr){
        model.set(attr.key, attr.value);
      });

      model.save().then(function () {
        self.transitionToRoute('midwife', model);
      }, function () {});
    }
  }
});
