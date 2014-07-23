SmartClient.AppointmentsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('appointment');
  }
});

