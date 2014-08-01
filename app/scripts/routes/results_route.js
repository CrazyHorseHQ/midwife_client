SmartClient.ResultsRoute = Ember.Route.extend({
  model: function (params) {
    var query_type = 'name';

    if (params.keyword.match(/[hH][0-9]+/)) {
      query_type = 'hospital_number'
    } else if (params.keyword.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)) {
      query_type = 'dob'
    }

    var options = {}
    options[query_type] = params.keyword
    model = this.store.find('service_user', options)

    model.then(function () {
      model.set('keyword', params.keyword)
    }, function () {
      log("error")
    });

    return model;
  },

  setupController: function(controller, model) {
    controller.set('model', model.get('content'));
    controller.set('keyword', model.get('keyword'));
  }
});
