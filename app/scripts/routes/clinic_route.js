SmartClient.ClinicRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    var clinics_model = this.modelFor('clinics')

    return clinics_model.findBy('id', params.clinic_id)
  },

  renderTemplate: function () {
    this.render('clinic', {
      into: 'application',
      outlet: 'content_column'
    })
  },

  setupController: function (controller, model) {
    controller.set('model', model)
    controller.toggleProperty('forceToggle')
  }
});
