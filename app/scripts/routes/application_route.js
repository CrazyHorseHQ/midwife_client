SmartClient.ApplicationRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    model: function () {
        return [
          {label: 'Service Providers', resource: 'service_providers'},
          {label: 'Appointments', resource: 'appointments'},
          {label: 'Service Users', resource: 'service_users'}
        ];
    }
});
