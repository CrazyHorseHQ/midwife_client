SmartClient.AppointmentsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('appointment');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});

