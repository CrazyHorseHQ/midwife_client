MidwifeClient.MidwifeEditController = Ember.ObjectController.extend({
  needs: 'midwife',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        console.log(attr)
        self.get('controllers.midwife.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('midwife',this.get('model'));
    }
  }
});

