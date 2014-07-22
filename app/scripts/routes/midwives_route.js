MidwifeClient.MidwivesRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('midwife');
  }
});
