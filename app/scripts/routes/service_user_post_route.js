SmartClient.ServiceUserPostRoute = SmartClient.AuthenticatedRoute.extend({
  renderTemplate: function () {
    this.render({
      outlet: 'suFields',
      controller: this.controllerFor('serviceUser')
    });
  }
});
