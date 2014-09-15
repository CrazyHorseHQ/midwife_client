SmartClient.AppointmentsController = Ember.ArrayController.extend({
  //queryParams: ['selectedClinic', 'selectedServiceOption'],
  needs: ['clinic'],
  itemController: "appointment",
  sortProperties: ["date", "time"],
  sortAscending: true,

  // Helpers to get the filters
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

  showAppointmentsList: function() {
    return this.get('selectedClinic') && this.get('selectedServiceOption');
  }.property('selectedClinic', 'selectedServiceOption'),

  noFiltersApplied: function() {
    return !(
      this.get('selectedSP') ||
      this.get('selectedDate') ||
      this.get('selectedServiceOption') ||
      this.get('selectedClinic')
    );
  }.property('selectedDate', 'selectedSP', 'selectedServiceOption', 'selectedClinic'),

  // Filter toggles and trigger
  selectedDate: moment().format('YYYY-MM-DD'),
  selectedSP: false,
  selectedServiceOption: false,
  selectedClinic: false,
  showMyOnly: false,

  filterDidChange: function() {
    this.applyFilters();
  }.observes('selectedDate', 'selectedSP', 'selectedServiceOption', 'selectedClinic'),

  // Filter helpers
  dateFilter: function(content, date) {
    return this.filterHelper(content, 'date', date);
  },

  serviceOptionFilter: function(content, so) {
    return content.filter(function(item) {
      return item.get('service_options').mapBy('id').contains(so);
    });
  },

  clinicFilter: function(content, clinic) {
    return this.filterHelper(content, 'clinic.id', clinic);
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
    var selectedServiceOption = this.get('selectedServiceOption');
    var selectedClinic = this.get('selectedClinic');
    var appointments = this.get('all');
    this.set('content', appointments);

    if (selectedDate) {
      appointments = this.dateFilter(appointments, selectedDate);
    }

    if (selectedSP) {
      appointments = this.spFilter(appointments, selectedSP);
    }

    if (selectedServiceOption) {
      appointments = this.serviceOptionFilter(appointments, selectedServiceOption);
    }

    if (selectedClinic) {
      appointments = this.clinicFilter(appointments, selectedClinic);
    }

    if (selectedClinic && selectedDate) {
      var clinicController = this.get('controllers.clinic')
      clinicController.set('model', this.store.getById('clinic', selectedClinic));
      clinicController.send('load_appointments', selectedDate);
    }

    this.set('content', appointments);
    return this.get('content');
  },

  //Actions
  actions: {
    filterByDate: function(date) {
      this.set('selectedDate', date.fmt());
    },

    filterByServiceOption: function(so) {
      //reset the clinic filter when selecting SO.
      this.set('selectedClinic', false);
      this.set('selectedServiceOption', so);
    },

    filterByClinic: function(c) {
      this.set('selectedClinic', c);
    },

    filterBySP: function(sp) {
      this.set('selectedSP', sp);
      this.set('showMyOnly', false);
    },

    // TODO ideally this would be a separate view...
    myAppointments: function() {
      this.set('selectedSP', this.get('currentSPId'));
      this.set('showMyOnly', true);
      this.applyFilters();
    },

    clearFilters: function() {
      this.set('showMyOnly', false);
      this.set('selectedDate', moment().format('YYYY-MM-DD'));
      this.set('selectedSP', false);
      this.set('selectedServiceOption', false);
      this.set('selectedClinic', false);
      this.applyFilters();
    },
  }
});

