SmartClient.LoginController = Ember.ObjectController.extend({
  // Implement your controller here.
  actions: {
    submit: function() {
      var self = this;
      var login = this.store.createRecord('Login');
      console.log(login);
      login.set('username', self.get('username'));
      login.set('password', self.get('password'));
      console.log(login.get('token'));
    }
  }
});

