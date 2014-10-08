SmartClient.ServiceUserServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    sos = this.modelFor('serviceUserServiceOptions');
    return sos.findBy('id', params.service_option_id);
  },

  renderTemplate: function (model) {
    var controller = this.controllerFor('serviceOption');

    controller.setProperties({
      model: model,
      'controllers.service_options.selectedServiceOptionId': model.get('id'),
      selectedServiceOptionId: model.get('id')
    })

    this.render('service_option', {
      controller: controller
    });
  }
});
