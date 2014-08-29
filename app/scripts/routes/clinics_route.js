SmartClient.ClinicsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var so = this.modelFor('service_option')

    return this.store.find('clinic', {ids: so.clinic_ids});
  }
});
