MidwifeClient.MidwifeEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('midwife', this.modelFor('midwife').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('val') }
    });
    controller.set('buffer', buffer)
  }
});

