SmartClient.AppointmentRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('appointment', params.appointment_id);
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('allServiceOptions', this.store.all('service_option'));
  },
});

