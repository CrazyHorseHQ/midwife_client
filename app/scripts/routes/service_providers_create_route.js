SmartClient.ServiceProvidersCreateRoute = SmartClient.AuthenticatedRoute.extend({
  renderTemplate: function () {
    this.render('service_providers/create', {
      into: 'application',
      outlet: 'content_column'
    })
  }
});
