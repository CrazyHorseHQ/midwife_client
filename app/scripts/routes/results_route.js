SmartClient.ResultsRoute = Ember.Route.extend({
  model: function (params) {
    model = this.store.find('service_user', params.keyword)

    model.then(function () {
      model.set('keyword', params.keyword)
    }, function () {
      log("error")
      model.deleteRecord()
    });

    return model;
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
