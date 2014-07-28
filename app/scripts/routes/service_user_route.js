SmartClient.ServiceUserRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('service_user', params.service_user_id);
  }
});

