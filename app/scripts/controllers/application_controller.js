SmartClient.ApplicationController = Ember.ArrayController.extend({
  // Implement your controller here.
  needs: ['login'],

  currentUser: (function() {
    return this.get('controllers.login.loggedin_user')
  }).property('controllers.login.loggedin_user'),

  isAuthenticated: (function() {
    return !Ember.isEmpty(
      this.get('controllers.login.loggedin_user')
    );
  }).property('controllers.login.loggedin_user')
});

