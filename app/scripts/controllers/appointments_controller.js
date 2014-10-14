SmartClient.AppointmentsController = Ember.ArrayController.extend({
  //queryParams: ['selectedClinicId', 'selectedServiceOptionId'],
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
    return this.get('selectedClinicId') && this.get('selectedServiceOptionId');
  }.property('selectedClinicId', 'selectedServiceOptionId'),

  noFiltersApplied: function() {
    return !(
      this.get('selectedSP') ||
      this.get('selectedDate') ||
      this.get('selectedServiceOptionId') ||
      this.get('selectedClinicId')
    );
  }.property('selectedDate', 'selectedSP', 'selectedServiceOptionId', 'selectedClinicId'),

  // Filter toggles and trigger
  selectedDate: moment().format('YYYY-MM-DD'),
  selectedSP: false,
  selectedServiceOptionId: false,
  selectedClinicId: false,
  showMyOnly: false,

  selectedClinic: function () {
    if (this.get('selectedClinicId')) {
      return this.store.getById('clinic', this.get('selectedClinicId'))
    }
  }.property('selectedClinicId'),

  filterDidChange: function() {
    this.applyFilters();
  }.observes('selectedDate', 'selectedSP', 'selectedServiceOptionId', 'selectedClinicId'),

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
    var selectedServiceOptionId = this.get('selectedServiceOptionId');
    var selectedClinicId = this.get('selectedClinicId');
    var appointments = this.get('all');
    this.set('content', appointments);

    if (selectedDate) {
      appointments = this.dateFilter(appointments, selectedDate);
    }

    if (selectedSP) {
      appointments = this.spFilter(appointments, selectedSP);
    }

    if (selectedServiceOptionId) {
      appointments = this.serviceOptionFilter(appointments, selectedServiceOptionId);
    }

    if (selectedClinicId) {
      appointments = this.clinicFilter(appointments, selectedClinicId);
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
      this.set('selectedClinicId', false);
      this.set('selectedServiceOptionId', so);
      this.set('showList', false);
    },

    filterByClinic: function(c) {
      this.set('selectedClinicId', c);
      this.set('showList', true);
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
      this.set('selectedServiceOptionId', false);
      this.set('selectedClinicId', false);
      this.applyFilters();
    },
    openModal: function (modalName, controller) {
      this.send('openModalWindow', modalName, controller)
    },
    closeModal: function () {
      this.send('closeModalWindow')
    }
  }
});

