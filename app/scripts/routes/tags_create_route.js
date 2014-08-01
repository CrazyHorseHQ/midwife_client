SmartClient.TagsCreateRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').createRecord('tag', {});
  }
});

