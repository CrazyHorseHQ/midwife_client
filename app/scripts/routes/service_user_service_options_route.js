SmartClient.ServiceUserServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    return this.get('store').find('service_option');
  },

  renderTemplate: function () {
    var controller = this.controllerFor('serviceOptions');
    controller.set('model', this.modelFor('serviceUserServiceOptions'))

    this.render('service_user/service_options', {
      controller: controller
    });
  }
});
