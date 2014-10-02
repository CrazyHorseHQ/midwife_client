SmartClient.ServiceUserServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    return this.get('store').find('service_option');
  },

  renderTemplate: function () {
    var controller = this.controllerFor('serviceOptions');
    controller.setProperties({
      model: this.modelFor('serviceUserServiceOptions'),
      routeContext: 'service_user.'
    })

    this.render('service_options', {
      controller: controller
    });
  }
});
