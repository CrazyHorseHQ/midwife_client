SmartClient.TagsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('tag');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});

