SmartClient.ClinicsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var so = this.modelFor('service_option')

    return so.get('clinics')
  }
});
