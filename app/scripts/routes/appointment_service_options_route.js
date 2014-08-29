SmartClient.AppointmentServiceOptionsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('appointment').get('service_options');
  },

  setupController: function(controller, model) {
    controller.set('service_options', this.store.all('service_option'));
  }
});

