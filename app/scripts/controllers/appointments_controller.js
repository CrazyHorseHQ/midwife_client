SmartClient.AppointmentsController = Ember.ArrayController.extend({
  // Helpers to get the filters
  dates: function() { 
    dates = this.get('all').mapBy('date').toArray().uniq();
    dates.unshiftObject('All');
    return dates;
  }.property('model.date'),

  service_providers: function() { 
    return this.get('all').mapBy('service_provider_id').toArray().uniq();
  }.property('model.service_provider_id'),

  all: function() {
    return this.get('store').all('appointment');
  }.property('model.@each'),

  // Filter toggles and trigger
  postNatalOnly: false,
  emergencyOnly: false,
  selectedDate: false,
  selectedSP: false,

  filterDidChange: function() {
    this.applyFilters();
  }.observes('postNatalOnly', 'emergencyOnly', 'selectedDate', 'selectedSP'),

  // Filter helpers
  postNatalFilter: function(content) {
    return this.filterHelper(content, 'visit_type', 'post-natal');
  },

  emergencyFilter: function(content) {
    return this.filterHelper(content, 'priority', 'emergency');
  },

  dateFilter: function(content, date) {
    return this.filterHelper(content, 'date', date);
  },

  spFilter: function(content, sp) {
    return this.filterHelper(content, 'service_provider_id', sp);
  },

  filterHelper: function(content, key, value) {
    return content.filter(function(item) {
      return item.get(key) == value;
    });
  },

  //Main Filter function
  applyFilters: function() {
    var selectedDate = this.get('selectedDate');
    var selectedSP = this.get('selectedSP');
    var postNatal = this.get('postNatalOnly');
    var emergency = this.get('emergencyOnly');
    var appointments = this.get('all');
    this.set('content', appointments);

    if (selectedDate) {
      appointments = this.dateFilter(appointments, selectedDate);
    }

    if (selectedSP) {
      appointments = this.spFilter(appointments, selectedSP);
    }

    if (postNatal) {
      appointments = this.postNatalFilter(appointments);
    }
  
    if (emergency) {
      appointments = this.emergencyFilter(appointments);
    }

    this.set('content', appointments);
    return this.get('content');
  },
  
  //Actions
  actions: {
    filterByDate: function(date) {
      if (date.fmt() == 'All') {
        this.set('selectedDate', false);
      } else {
        this.set('selectedDate', date.fmt());
      }
    },

    clearFilters: function() {
      //TODO FIXME how to change the checkbox state from here? or from the view?
      this.set('selectedDate', false);
      this.set('selectedSP', false);
      this.set('postNatal', false);
      this.set('emergency', false);
      this.applyFilters();
    }
  }
});

