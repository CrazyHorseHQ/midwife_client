SmartClient.AppointmentsCreateRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').createRecord('appointment', {});
  },
});

