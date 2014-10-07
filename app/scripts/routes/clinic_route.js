SmartClient.ClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('clinics')

    return clinics_model.findBy('id', params.clinic_id)
  },

  setupController: function (controller, model) {
    controller.setProperties({
      model: model,
      suModel: null,
    })
  },

  renderTemplate: function () {
    this.render('clinic', {
      into: 'application',
      outlet: 'content_column'
    })
  }
});
