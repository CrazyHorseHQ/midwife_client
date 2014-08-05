SmartClient.AppointmentRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('appointment', params.appointment_id);
  },
  setupController: function(controller, context) {
    controller.set('content', context);
  },
});

