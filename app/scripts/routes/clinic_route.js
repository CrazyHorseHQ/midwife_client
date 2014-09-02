SmartClient.ClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('clinics')

    return clinics_model.findBy('id', params.clinic_id)
  }
});
