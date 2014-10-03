SmartClient.ServiceUserPostRoute = SmartClient.AuthenticatedRoute.extend({
  renderTemplate: function () {
    this.render({
      into: 'service_user',
      outlet: 'suFields',
      controller: this.controllerFor('serviceUser')
    });
  }
});
