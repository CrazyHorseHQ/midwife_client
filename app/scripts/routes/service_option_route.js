SmartClient.ServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    sos = this.modelFor('service_options');
    return sos.findBy('id', params.service_option_id);
  },

  renderTemplate: function () {
    this.render('service_option', {
      into: 'application',
      outlet: 'content_column'
    })
  },

  setupController: function (controller, model) {
    controller.setProperties({
      model: model,
      'controllers.service_options.selectedServiceOptionId': model.get('id')
    })
  }
});
