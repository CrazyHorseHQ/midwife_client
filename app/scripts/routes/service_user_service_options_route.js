SmartClient.ServiceUserServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    // return this.get('store').find('service_options');
    return [
      {
        id: 1,
        name: "Domino (Dublin)",
        clinic_ids: [2, 3, 4, 5]
      }
    ]
  },

  renderTemplate: function () {
    var controller = this.controllerFor('serviceOptions');
    controller.set('model', this.modelFor('serviceUserServiceOptions'))

    this.render('service_user/service_options', {
      controller: controller
    });
  }
});
