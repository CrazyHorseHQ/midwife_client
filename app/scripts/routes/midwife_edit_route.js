MidwifeClient.MidwifeEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('midwife', this.modelFor('midwife').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = []

    model.get('attributes').forEach(function(attr) {
      if (['password', 'id', 'active'].indexOf(attr.get('key')) == -1) {
        buffer.push({ key: attr.get('key'), value: attr.get('value') })
      }
    });
    controller.set('buffer', buffer)
  }
});
