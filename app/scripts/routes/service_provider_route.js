SmartClient.ServiceProviderRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('service_provider', params.service_provider_id);
  }
});
