SmartClient.ApplicationController = Ember.ArrayController.extend({
  // Implement your controller here.
  needs: ['login'],

  currentPath: function() {
    return SmartClient.__container__.lookup('router:main').location.location.hash;
  }.property(),

  hideNav: function() {
    return this.get('currentPath') == "about";
  }.property(),

  currentUser: function() {
    if (localStorage.getItem('loggedinUser')) {
      var json_sp = JSON.parse(localStorage.getItem('loggedinUser'));
      var sp = this.get('store').getById('service_provider', json_sp['id']);
      if (!sp){
        sp = this.get('store').createRecord('ServiceProvider', json_sp);
      }
      return sp;
    }
    return null;
  }.property(),

  isAuthenticated: (function() {
    return !Ember.isEmpty(
      localStorage.getItem('authToken')
    );
  }).property(),

  actions: {
    openServiceUser: function (service_user) {
      this.transitionToRoute('service_user.personal', service_user.id)
    }
  }
});
