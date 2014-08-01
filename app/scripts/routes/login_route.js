SmartClient.LoginRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('Login');
  },
  setupController: function(controller, context) {
    controller.reset();
    controller.set('model', this.model());
    controller.set('content', this.model());

    if (localStorage.getItem('authToken')) {
      controller.set('token', localStorage.getItem('authToken'));
      // TODO investigate other ways on handling this
      var sp = this.store.createRecord('ServiceProvider', JSON.parse(localStorage.getItem('loggedinUser')));
      controller.set('loggedin_user', sp);
    }
  },
  beforeModel: function(transition) {
    if (!Ember.isEmpty(this.controllerFor('login').get('token'))) {
      this.transitionToRoute('appointments');
    }
  }
});

