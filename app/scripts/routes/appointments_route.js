SmartClient.AppointmentsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function() {
    return this.get('store').find('appointment');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('tags', this.get('store').find('tag'));
  },
  renderTemplate: function(controller) {
    this.render();
    this.render('appointments/filters', {
      outlet: 'filters',
      into: 'appointments',
      controller: controller
    });
  },
});

