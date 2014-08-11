SmartClient.AppointmentsCreateRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').createRecord('appointment', {});
  },
  setupController: function(controller, context) {
    controller.set('content', context);
    controller.set('service_providers', this.store.all('service_provider'));
    controller.set('service_users', this.store.all('service_user'));
  },
});
