SmartClient.AppointmentsRoute = SmartClient.AuthenticatedRoute.extend({
  model: function() {
    return this.get('store').find('appointment');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('service_options', this.get('store').find('service_option'));
    controller.set('service_providers', this.get('store').find('service_provider'));
  },
  renderTemplate: function(controller) {
    this.render();
    this.render('appointments/service_option_selector', {
      outlet: 'serviceOptionSelector',
      into: 'appointments',
      controller: controller
    });
    this.render('appointments/date_filter', {
      outlet: 'dateFilter',
      into: 'appointments',
      controller: controller
    });
  },
  actions: {
    openBookModal: function(modalName, controller, time) {
      controller.set('time', time);
      this.send('openModal', modalName, controller);
    },
    closeBookModal: function() {
      this.send('closeModal');
    },
  },
});

