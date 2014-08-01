SmartClient.LoginController = Ember.ObjectController.extend({
  token: null,
  loggedin_user: null,
  attemptedTransition: null,

  reset: function() {
    this.set('token', null);
    this.set('loggedin_user', null);
    this.set('attemptedTransition', null);
  },

  tokenChanged: (function() {
    if (Ember.isEmpty(this.get('token'))) {
      this.reset();
    }
  }).observes('token'),

  // Implement your controller here.
  actions: {
    submit: function() {
      var self = this;
      var login = self.get('model');
      login.set('username', self.get('username'));
      login.set('password', self.get('password'));

      // Setup the token and logged in user info
      login.save().then(function(result){
        self.set('token', result.get('token'));
        var loggedin_user = self.get('store').find('service_provider', result.get('id'));
        self.set('loggedin_user', loggedin_user);
        self.transitionToRoute(self.get('attemptedTransition'));
      });
    }
  }
});

