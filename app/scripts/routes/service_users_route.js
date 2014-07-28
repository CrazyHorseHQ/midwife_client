SmartClient.ServiceUsersRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('service_user');
  }
});

