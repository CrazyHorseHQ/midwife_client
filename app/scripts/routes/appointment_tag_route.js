SmartClient.AppointmentTagRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('appointment').get('tags', params.tag_id);
  },

  setupController: function(controller, model) {
    controller.set('appointment', this.modelFor('appointment'));
  }
});

