SmartClient.TagRoute = SmartClient.AuthenticatedRoute.extend({
  model: function(params) {
    return this.get('store').find('tag', params.tag_id);
  }
});

