SmartClient.AppointmentServiceOptionRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('appointment').get('service_option_ids', params.service_option_id);
  },

  setupController: function(controller, model) {
    controller.set('appointment', this.modelFor('appointment'));
  },
  serialize: function(model, params) {
    return {
      appointment_id: model.appointment_id,
      service_option_id: model.service_option_id
    };
  }
});

