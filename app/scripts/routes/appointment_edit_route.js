SmartClient.AppointmentEditRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    var apt_model = this.modelFor('appointment');
    return this.get('store').find('appointment', apt_model.appointment.id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    buffer = model.get('attributes').map(function(attr){
      return { key: attr.get('key'), value: attr.get('value') }
    });
    controller.set('buffer', buffer)
  }
});

