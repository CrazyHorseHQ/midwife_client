SmartClient.AppointmentTagsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('appointment').get('tags');
  },

  setupController: function(controller, model) {
    // TODO is this good?
    this._super(controller, model);
    controller.set('appointment', this.modelFor('appointment'));
  }
});

