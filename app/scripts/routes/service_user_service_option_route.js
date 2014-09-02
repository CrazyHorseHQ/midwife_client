SmartClient.ServiceUserServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (params) {
    sos = this.modelFor('serviceUserServiceOptions');
    return sos.findBy('id', params.service_option_id);
  },

  renderTemplate: function (model) {
    var controller = this.controllerFor('serviceOption');

    controller.set('model', model);

    this.render('service_user/service_option', {
      controller: controller
    });
  }
});
