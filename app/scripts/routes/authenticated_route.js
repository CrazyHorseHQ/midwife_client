SmartClient.AuthenticatedRoute = Ember.Route.extend({
  // verify if the token property of the login controller is set before continuing with the request
  // if it is not, redirect to the login route (login)
  beforeModel: function(transition) {
    if (Ember.isEmpty(localStorage.getItem('authToken'))) {
      return this.redirectToLogin(transition);
    }
  },
  // Redirect to the login page and store the current transition so we can
  // run it again after login
  redirectToLogin: function(transition) {
    this.controllerFor('login').set('attemptedTransition', transition);
    return this.transitionTo('login');
  },

  currentUser: function(){
    return JSON.parse(localStorage.getItem('loggedinUser'));
  },
});
