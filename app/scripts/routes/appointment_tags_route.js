SmartClient.AppointmentTagsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('appointment').get('tags');
  },

  setupController: function(controller, model) {
    controller.set('tags', this.store.all('tag'));
  }
});

