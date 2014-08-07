SmartClient.ServiceUserEditRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('service_user', this.modelFor('service_user').id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = []

    model.get('attributes').forEach(function(attr) {
      if (['id', 'gestation_period'].indexOf(attr.get('key')) == -1) {
        buffer.push({ key: attr.get('key'), value: attr.get('value'), parentKey: attr.get('parentKey') })
      }
    });
    controller.set('buffer', buffer)
  }
});
