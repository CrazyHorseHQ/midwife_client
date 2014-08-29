SmartClient.ServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    return this.get('store').get('service_options');
  }
});
