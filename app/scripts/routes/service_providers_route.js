SmartClient.ServiceProvidersRoute = SmartClient.AuthenticatedRoute.extend({
  model: function() {
    return this.get('store').find('service_provider');
  }
});
