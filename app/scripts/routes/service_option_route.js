SmartClient.ServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (service_option_id) {
    sos = this.modelFor('service_options');

    return sos[0];
  }
});
