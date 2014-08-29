SmartClient.ServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('service_option', params.service_option_id);
  }
});

