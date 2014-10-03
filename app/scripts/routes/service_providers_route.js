SmartClient.ServiceProvidersRoute = SmartClient.AuthenticatedRoute.extend({
  model: function() {
    return this.get('store').find('service_provider');
  },

  renderTemplate: function () {
    this.render('service_providers', {
      into: 'application',
      outlet: 'side_column'
    })
  }
});
