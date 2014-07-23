SmartClient.ServiceProvidersCreateRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').createRecord('service_provider', {password: ""});
  }
});
