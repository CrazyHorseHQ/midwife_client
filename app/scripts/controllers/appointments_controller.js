SmartClient.AppointmentsController = Ember.ArrayController.extend({
  // Helpers to get the filters
  dates: function() {
    var self = this;
    var dates = this.get('all').mapBy('date').toArray().uniq();
    var datesList = dates.map(function(d) {
      var selected = (d == self.get('selectedDate'));
      return Ember.Object.create({selected: selected, date: d});
    });
    return datesList;
  }.property('model.date'),

  visit_types: function(){
    var self = this;
    var visit_types = self.get('all').mapBy('visit_type').toArray().uniq()
    return visit_types.map(function(vt) {
      var selected = (vt == self.get('selectedVisitType'));
      // TODO see if model.toJSON can be used here.
      return Ember.Object.create({id: vt, name: vt.capitalize(), selected: selected});
    });
  }.property('model.visit_type'),

  priorities: function(){
    var self = this;
    var priorities = self.get('all').mapBy('priority').toArray().uniq()
    return priorities.map(function(p) {
      var selected = (p == self.get('selectedPriority'));
      return Ember.Object.create({id: p, name: p.capitalize(), selected: selected});
    });
  }.property('model.priority'),

  all: function() {
    return this.get('store').all('appointment');
  }.property('model.@each'),

  currentSPId: function() {
    var currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
    return currentUser["id"];
  }.property(),

  selectedSPName: function() {
    return this.get('service_providers').filterBy('id', this.get('selectedSP'))[0].get('name');
  }.property('selectedSP'),

  // Filter toggles and trigger
  selectedVisitType: false,
  selectedPriority: false,
  selectedDate: false,
  selectedSP: false,
  selectedTag: false,
  showMyOnly: true,
  showFitlers: false,

  filterDidChange: function() {
    this.applyFilters();
  }.observes('selectedVisitType', 'selectedPriority', 'selectedDate', 'selectedSP', 'selectedTag'),

  // Filter helpers
  visitTypeFilter: function(content, visitType) {
    return this.filterHelper(content, 'visit_type', visitType);
  },

  priorityFilter: function(content, priority) {
    return this.filterHelper(content, 'priority', priority);
  },

  dateFilter: function(content, date) {
    return this.filterHelper(content, 'date', date);
  },

  tagFilter: function(content, tag) {
    return content.filter(function(item) {
      return item.get('tags').mapBy('id').contains(tag);
    });
  },

  spFilter: function(content, sp) {
    return content.filter(function(item) {
      return item.get('service_provider').get('id') == sp;
    });
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
    var selectedVisitType = this.get('selectedVisitType');
    var selectedPriority = this.get('selectedPriority');
    var selectedTag = this.get('selectedTag');
    var appointments = this.get('all');
    this.set('content', appointments);

    if (selectedDate) {
      appointments = this.dateFilter(appointments, selectedDate);
    }

    if (selectedSP) {
      appointments = this.spFilter(appointments, selectedSP);
    }

    if (selectedVisitType) {
      appointments = this.visitTypeFilter(appointments, selectedVisitType);
    }

    if (selectedPriority) {
      appointments = this.priorityFilter(appointments, selectedPriority);
    }

    if (selectedTag) {
      appointments = this.tagFilter(appointments, selectedTag);
    }

    this.set('content', appointments);
    return this.get('content');
  },

  //Actions
  actions: {
    filterByDate: function(date) {
      this.set('selectedDate', date.fmt());
    },

    filterByVisitType: function(type) {
      this.set('selectedVisitType', type);
    },

    filterByPriority: function(priority) {
      this.set('selectedPriority', priority);
    },

    filterByTag: function(tag) {
      this.set('selectedTag', tag);
    },

    filterBySP: function(sp) {
      this.set('selectedSP', sp);
    },

    // TODO ideally this would be a separate view...
    myAppointments: function() {
      this.set('selectedSP', this.get('currentSPId'));
      this.set('showMyOnly', true);
      this.set('showFitlers', false);
      this.applyFilters();
    },

    clearFilters: function() {
      this.set('showMyOnly', false);
      this.set('showFitlers', true);
      this.set('selectedDate', false);
      this.set('selectedSP', false);
      this.set('selectedVisitType', false);
      this.set('selectedPriority', false);
      this.set('selectedTag', false);
      this.applyFilters();
    },
  }
});

