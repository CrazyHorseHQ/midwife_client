SmartClient.AutoSearchComponent = Ember.Component.extend({
  placeholderString: "Search...",
  searchString: null,
  store: null,
  navbar: false,

  actions: {
    resultSelected: function (service_user) {
      this.set('searchString', '')
      this.sendAction('resultSelected', service_user)
    }
  },

  searchResults: function() {
    var searchString = this.get('searchString');

    if (!searchString || (searchString && searchString.length < 2)){ return; }

    var options = {}

    if (searchString.match(/[hHtT][0-9]+/)) {
      options['hospital_number'] = searchString.match(/[hHtT][0-9]+/)[0]

      searchString = searchString.replace(/[hHtT][0-9]+/, "").trim()
    }

    if (searchString.match(/@[0-9]{2}\-[0-9]{2}\-[0-9]{4}/)) {
      options['dob'] = searchString.match(/[0-9]{2}\-[0-9]{2}\-[0-9]{4}/)[0]

      searchString = searchString.replace(/@[0-9]{2}\-[0-9]{2}\-[0-9]{4}/, "").trim()
    }

    if (searchString) {
      options['name'] = searchString;
    }

    return this.get('store').find('service_user', options)
  }.property('searchString')
});
