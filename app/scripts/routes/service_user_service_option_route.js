SmartClient.ServiceUserServiceOptionRoute = SmartClient.AuthenticatedRoute.extend({
  model: function (service_option_id) {
    sos = this.modelFor('serviceUserServiceOptions');

    return sos[0];
  },

  renderTemplate: function () {
    var controller = this.controllerFor('serviceOption');
    sos = this.modelFor('serviceUserServiceOptions');

    controller.set('model', sos[0]);

    this.render('service_user/service_option', {
      controller: controller
    });
  }
});
