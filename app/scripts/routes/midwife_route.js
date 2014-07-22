MidwifeClient.MidwifeRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('midwife', params.midwife_id);
  }
});

