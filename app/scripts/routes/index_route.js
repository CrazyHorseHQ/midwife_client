SmartClient.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('service_options')
  }
})
