SmartClient.ClinicsRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('clinic');
  }
});

