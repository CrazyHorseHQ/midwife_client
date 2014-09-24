/*global Ember*/
SmartClient.ResetPassword = DS.Model.extend({
  token: DS.attr(),
  username: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  password_verification: DS.attr()
});

