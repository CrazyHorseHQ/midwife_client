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
    } else {
      localStorage.setItem('authToken', this.get('token'));
    }
  }).observes('token'),

  loggedinUserChanged: (function() {
    if (!Ember.isEmpty(this.get('token')) && !Ember.isEmpty(this.get('loggedin_user'))) {
      var json_obj = JSON.stringify(this.get('loggedin_user').toJSON({"includeId": true}));
      localStorage.setItem('loggedinUser', json_obj);
    }
  }).observes('loggedin_user'),

  // Implement your controller here.
  actions: {
    submit: function() {
      var self = this;
      var login = this.store.createRecord('Login');
      login.set('username', self.get('username'));
      login.set('password', self.get('password'));

      // Setup the token and logged in user info
      login.save().then(function(result){
        self.set('token', result.get('token'));
        localStorage.setItem('authToken', result.get('token'));

        adapter = self.get('container').lookup('adapter:application')
        adapter.set('headers', { 'Auth-Token': localStorage.getItem('authToken') })

        Ember.$.ajaxSetup({
          headers: {
            "Auth-Token": localStorage.getItem('authToken'),
          }
        });

        self.get('store').find('service_provider', result.get('id')).then(function(loggedin_user) {
          self.set('loggedin_user', loggedin_user);
          self.transitionToRoute(self.get('attemptedTransition'))
        });
      }, function (resp) {
        self.setErrors(resp, "login_errors")
      });
    }
  }
});

