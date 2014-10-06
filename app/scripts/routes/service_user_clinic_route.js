SmartClient.ServiceUserClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('serviceUserClinics')

    return clinics_model.findBy('id', params.clinic_id)
  },

  renderTemplate: function (model) {
    var controller = this.controllerFor('clinic');

    controller.setProperties({
      model: model,
      suModel: this.modelFor('service_user'),
    })

    this.render('clinic', {
      into: 'application',
      outlet: 'content_column',
      controller: controller
    });
  }
});
