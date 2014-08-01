SmartClient.LoginRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('Login');
  },
  setupController: function(controller, context) {
    controller.reset();
    controller.set('model', this.model());
    controller.set('content', this.model());
  },
  beforeModel: function(transition) {
    if (!Ember.isEmpty(this.controllerFor('login').get('token'))) {
      this.transitionToRoute('appointments');
    }
  }
});

