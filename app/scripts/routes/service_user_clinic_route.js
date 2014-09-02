SmartClient.ServiceUserClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('serviceUserClinics')

    return clinics_model.findBy('id', params.clinic_id)
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
