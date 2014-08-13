SmartClient.AppointmentEditRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    var apt_model = this.modelFor('appointment');
    return this.get('store').find('appointment', apt_model.get('id'));
  },
  setupController: function(controller, model){
    controller.set('content', model);
    controller.set('service_providers', this.store.all('service_provider'));
    controller.set('service_users', this.store.find('service_user'));
  }
});

