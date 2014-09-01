SmartClient.ServiceUserClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('serviceUserClinics')
    var clinic = clinics_model.find(function (item, index, enumerator) {
      return item.id == params.clinic_id
    }, clinics_model)

    return clinic;
  },

  renderTemplate: function (model) {
    var controller = this.controllerFor('clinic');

    controller.set('model', model);
    controller.set('suModel', this.modelFor('service_user'));

    this.render('service_user/clinic', {
      controller: controller
    });
  }
});
