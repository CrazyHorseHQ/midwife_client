SmartClient.AppointmentEditRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    var apt_model = this.modelFor('appointment');
    return this.get('store').find('appointment', apt_model.get('id'));
  },
  setupController: function(controller, model){
    controller.set('content', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('value') }
    });
    controller.set('buffer', buffer)
  }
});

