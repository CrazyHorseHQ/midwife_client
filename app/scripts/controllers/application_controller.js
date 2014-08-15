SmartClient.ApplicationController = Ember.ArrayController.extend({
  // Implement your controller here.
  needs: ['login'],

  currentUser: (function() {
    if (localStorage.getItem('loggedinUser')) {
      var json_sp = JSON.parse(localStorage.getItem('loggedinUser'));
      var sp = this.store.getById('service_provider', json_sp['id']);
      if (!sp){
        sp = this.store.createRecord('ServiceProvider', json_sp);
      }
      return sp;
    }
    return null;
  }).property(),

  isAuthenticated: (function() {
    return !Ember.isEmpty(
      this.get('currentUser')
    );
  }).property('currentUser')
});

