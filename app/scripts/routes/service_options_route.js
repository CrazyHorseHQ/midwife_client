SmartClient.ServiceOptionsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function () {
    return this.get('store').find('service_option');
  },

  setupController: function (controller, model) {
    controller.setProperties({
      model: model,
      routeContext: '',
      selectedServiceOptionId: null
    })
  },

  renderTemplate: function () {
    this.render('service_options', {
      into: 'application',
      outlet: 'side_column'
    })
  }
});
