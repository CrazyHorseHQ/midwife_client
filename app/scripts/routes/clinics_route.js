SmartClient.ClinicsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var so = this.modelFor('service_option')
    if (so == undefined) {
      this.transitionTo('service_options');
    }

    return so.get('clinics')
  }
});
