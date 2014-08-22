SmartClient.ResultsRoute = Ember.Route.extend({
  model: function (params) {
    var searchString = params.searchString
    var options = {}

    if (searchString.match(/[hH][0-9]+/)) {
      options['hospital_number'] = searchString.match(/[hH][0-9]+/)[0]

      searchString = searchString.replace(/[hH][0-9]+/, "").trim()
    }

    if (searchString.match(/@[0-9]{2}\-[0-9]{2}\-[0-9]{4}/)) {
      options['dob'] = searchString.match(/[0-9]{2}\-[0-9]{2}\-[0-9]{4}/)[0]

      searchString = searchString.replace(/@[0-9]{2}\-[0-9]{2}\-[0-9]{4}/, "").trim()
    }

    if (searchString) {
      options['name'] = searchString;
    }

    return this.store.find('service_user', options)
  }
});
