SmartClient.ServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    return this.get('store').find('service_option');
  }
});
