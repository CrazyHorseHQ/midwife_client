SmartClient.ClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('clinics')
    var clinic = clinics_model.find(function (item, index, enumerator) {
      return item.id == params.clinic_id
    }, clinics_model)

    return clinic;
  }
});
