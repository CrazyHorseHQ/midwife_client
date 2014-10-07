SmartClient.LoginRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('Login');
  },
  setupController: function(controller, model) {
    controller.reset();
    controller.set('content', model);

    if (localStorage.getItem('authToken')) {
      controller.set('token', localStorage.getItem('authToken'));
      // TODO investigate other ways on handling this
      var sp = this.store.createRecord('ServiceProvider', JSON.parse(localStorage.getItem('loggedinUser')));
      controller.set('loggedin_user', sp);
    }
  },
  beforeModel: function(transition) {
    if (localStorage.getItem('authToken')) {
      this.transitionTo('appointments');
    }
  },

  renderTemplate: function () {
    this.render('login', {
      into: 'application',
      outlet: 'content_column'
    })
  }
});
