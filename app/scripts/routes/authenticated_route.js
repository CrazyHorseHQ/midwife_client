SmartClient.AuthenticatedRoute = Ember.Route.extend({
  // verify if the token property of the login controller is set before continuing with the request
  // if it is not, redirect to the login route (login)
  beforeModel: function(transition) {
    if (Ember.isEmpty(this.controllerFor('login').get('token'))) {
      return this.redirectToLogin(transition);
    }
  },
  // Redirect to the login page and store the current transition so we can
  // run it again after login
  redirectToLogin: function(transition) {
    this.controllerFor('login').set('attemptedTransition', transition);
    return this.transitionToRoute('login');
  }
});
