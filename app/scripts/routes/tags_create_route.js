SmartClient.TagsCreateRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').createRecord('tag', {});
  }
});

