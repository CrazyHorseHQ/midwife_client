SmartClient.HomeVisitListComponent = Ember.Component.extend({
  defaultDate: moment().format("YYYY-MM-DD"),
  selectedDate: moment().format("YYYY-MM-DD"),
  forceToggle: true,
  showPicker: 'hidden',

  appointments: function () {
    return this.get('store').find('appointment', {
      priority: 'home-visit',
      date: this.get('selectedDate')
    });
  }.property('selectedDate', 'forceToggle'),

  service_providers: function() {
     return this.get('store').find('service_provider');
  }.property(),

  actions: {
    dateForward: function() {
      var next_day = moment(this.get('selectedDate'), "YYYY-MM-DD").subtract(1, 'day').format('YYYY-MM-DD')
      this.set('selectedDate', next_day);
    },
    dateBackward: function() {
      var previous_day = moment(this.get('selectedDate'), "YYYY-MM-DD").add(1, 'day').format('YYYY-MM-DD')
      this.set('selectedDate', previous_day);
    },
    dateChosen: function (date) {
      this.set('selectedDate', date)
    },
    openAppointmentModal: function (appointment) {
      var selected_time = moment("2010-12-12T" + appointment.get('time')).format("HH:mm");

      this.sendAction('openModal', 'components/home-visit-edit-modal', SmartClient.HomeVisitEditModalComponent.create({
        store: this.get('store'),
        model: appointment,
        selected_sp: appointment.get('service_provider'),
        selected_time: selected_time,
        aptComponent: this,
        service_providers: this.get('service_providers'),
        times: this.get('times'),
        days: this.get('days'),
      }));
    },
    openBookingModal: function (time) {
      this.sendAction('openModal', 'components/home-visit-modal', SmartClient.HomeVisitModalComponent.create({
        store: this.get('store'),
        model: this.get('model'),
        aptComponent: this,
        selectedDate: this.get('selectedDate'),
        time: time,
        service_user: this.get('service_user'),
        service_option: this.get('model')
      }));
    },
    openPicker: function () {
      this.set('showPicker', 'text')
    },
    closeModal: function () {
      this.sendAction('closeModal')
    },
    markAttended: function (appointment_id) {
      this.get('store').find('appointment', appointment_id).then(function (ap) {
        ap.set('attended', true);
        ap.save();
      });
    }
  },

  days: function () {
    var collection = [],
        currentDayDate = moment(this.get('defaultDate')).add(1, 'day');

    for (var i = 0;i < 7;i++) {
      collection.push({
        day: i + 1,
        date: currentDayDate.format("YYYY-MM-DD"),
        formattedDate: currentDayDate.format("dd, MMM Do")
      });

      currentDayDate = currentDayDate.add(1, 'day');
    }

    return {
      firstThree: collection.slice(0, 3),
      secondThree: collection.slice(3, 6),
      thirdThree: collection.slice(6, 7)
    }
  }.property(),

  selectedDateFormatted: function () {
    return moment(this.get('selectedDate')).format("dddd, MMM Do")
  }.property('selectedDate')
});
