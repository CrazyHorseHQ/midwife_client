SmartClient.AppointmentsController = Ember.ArrayController.extend({
  // Helpers to get the filters
  dates: function() {
    var self = this;
    var dates = this.get('all').mapBy('date').toArray().uniq();
    dates.unshiftObject('All');
    var datesList = dates.map(function(d) {
      var selected = (d == self.get('selectedDate') || (d == 'All' && !self.get('selectedDate')));
      return Ember.Object.create({selected: selected, date: d});
    });
    return datesList;
  }.property('model.date'),

  service_providers: function() {
    return this.get('all').mapBy('service_provider_id').toArray().uniq();
  }.property('model.service_provider_id'),

  categories: function() {
    return this.get('all').mapBy('appointment_category_id').toArray().uniq();
  }.property('model.appointment_category_id'),

  visit_types: function(){
    var self = this;
    var visit_types = self.get('all').mapBy('visit_type').toArray().uniq()
    return visit_types.map(function(vt) {
      var selected = (vt == self.get('selectedVisitType'));
      return Ember.Object.create({id: vt, name: vt.capitalize(), selected: selected});
    });
  }.property('model.visit_type'),

  all: function() {
    return this.get('store').all('appointment');
  }.property('model.@each'),

  // Filter toggles and trigger
  selectedVisitType: false,
  emergencyOnly: false,
  selectedDate: false,
  selectedSP: false,
  selectedCategory: false,

  filterDidChange: function() {
    this.applyFilters();
  }.observes('selectedVisitType', 'emergencyOnly', 'selectedDate', 'selectedSP', 'selectedCategory'),

  // Filter helpers
  visitTypeFilter: function(content, visitType) {
    return this.filterHelper(content, 'visit_type', visitType);
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

  categoryFilter: function(content, category) {
    return this.filterHelper(content, 'appointment_category_id', category);
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
    var selectedCategory = this.get('selectedCategory');
    var selectedVisitType = this.get('selectedVisitType');
    var emergency = this.get('emergencyOnly');
    var appointments = this.get('all');
    this.set('content', appointments);

    if (selectedDate) {
      appointments = this.dateFilter(appointments, selectedDate);
    }

    if (selectedSP) {
      appointments = this.spFilter(appointments, selectedSP);
    }

    if (selectedCategory) {
      appointments = this.categoryFilter(appointments, selectedCategory);
    }

    if (selectedVisitType) {
      appointments = this.visitTypeFilter(appointments, selectedVisitType);
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

    filterByVisitType: function(type) {
      this.set('selectedVisitType', type);
    },

    clearFilters: function() {
      //TODO FIXME how to change the checkbox state from here? or from the view?
      this.set('selectedDate', false);
      this.set('selectedSP', false);
      this.set('selectedCategory', false);
      this.set('selectedVisitType', false);
      this.set('emergency', false);
      this.applyFilters();
    }
  }
});

