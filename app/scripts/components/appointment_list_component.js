SmartClient.AppointmentListComponent = Ember.Component.extend({
  selectedDate: moment().format("YYYY-MM-DD"),
  forceToggle: true,
  showPicker: 'hidden',

  defaultDate: function () {
    var daysOn = [],
        days = this.get('model.days');

    for (var day in days) {
      var on = days[day]

      if (on) {
        daysOn.push(day)
      }
    }

    var current_date = moment().day(daysOn[0]);
    // Adjust the day if we've already passed it in the current week.
    if (current_date < moment()) {
      current_date = current_date.add(1, 'week');
    }

    this.set('selectedDate', current_date.format('YYYY-MM-DD'));

    return current_date.format('YYYY-MM-DD')
  }.property('model.days'),

  appointments: function () {
    return this.get('store').find('appointment', {
      clinic_id: this.get('model').get('id'),
      date: this.get('selectedDate')
    });
  }.property('selectedDate', 'forceToggle'),

  service_providers: function() {
     return this.get('store').find('service_provider');
  }.property(),

  actions: {
    dateForward: function() {
      var next_week = moment(this.get('selectedDate'), "YYYY-MM-DD").subtract(1, 'week').format('YYYY-MM-DD')
      this.set('selectedDate', next_week);
    },
    dateBackward: function() {
      var previous_week = moment(this.get('selectedDate'), "YYYY-MM-DD").add(1, 'week').format('YYYY-MM-DD')
      this.set('selectedDate', previous_week);
    },
    dateChosen: function (date) {
      this.set('selectedDate', date)
    },
    openAppointmentModal: function (appointment) {
      var selected_time = moment("2010-12-12T" + appointment.get('time')).format("HH:mm");

      this.sendAction('openModal', 'components/appointment-modal', SmartClient.AppointmentModalComponent.create({
        store: this.get('store'),
        model: appointment,
        selected_sp: appointment.get('service_provider'),
        selected_time: selected_time,
        aptComponent: this,
        service_providers: this.get('service_providers'),
        times: this.get('times'),
        weeks: this.get('next_weeks'),
      }));
    },
    openBookingModal: function (time) {
      this.sendAction('openModal', 'components/booking-modal', SmartClient.BookingModalComponent.create({
        store: this.get('store'),
        model: this.get('model'),
        aptComponent: this,
        selectedDate: this.get('selectedDate'),
        time: time,
        service_user: this.get('service_user'),
        clinic: this.get('model')
      }));
    },
    openPicker: function () {
      this.set('showPicker', 'text')
    },
    closeModal: function () {
      this.sendAction('closeModal')
    }
  },

  times: function () {
    var self = this,
        times = [],
        apts = this.get('appointments'),
        model = this.get('model');
        range = moment().range(
          moment(this.get('selectedDate') + "T" + model.get('opening_time')),
          moment(this.get('selectedDate') + "T" + model.get('closing_time'))
        );
        var interval = model.get('appointment_interval');

    range.by('minutes', function (mom) {
      if (mom.minute() % interval == 0 || mom.minute() == 0) {
        times.push(Ember.Object.create({
          time: mom.format("HH:mm")
        }));
      }
    });

    apts.forEach(function (apt) {
      times.forEach(function (time, index) {
        var cal_time = moment(self.get('selectedDate') + "T" + time.time),
            apt_time = moment(self.get('selectedDate') + "T" + apt.get('time'));

        if (cal_time.isSame(apt_time)) {
          apt.get('service_user').then(function () {
            times[index].set('service_user', apt.get('service_user'))
          })
          times[index].set('appointment', apt)
        }
      });
    });

    return times;
  }.property('appointments.@each'),

  next_weeks: function () {
    var collection = [],
        currentWeekDate = moment(this.get('defaultDate')).add(1, 'week');

    for (var i = 0;i < 6;i++) {
      collection.push({
        weekName: i + 1,
        date: currentWeekDate.format("YYYY-MM-DD"),
        formattedDate: currentWeekDate.format("dd, MMM Do")
      });

      currentWeekDate = currentWeekDate.add(1, 'week');
    }

    return {
      firstThree: collection.slice(0, 3),
      secondThree: collection.slice(3)
    }
  }.property('model.days.@each'),

  selectedDateFormatted: function () {
    return moment(this.get('selectedDate')).format("dddd, MMM Do")
  }.property('selectedDate')
});
