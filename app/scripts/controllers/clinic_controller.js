SmartClient.ClinicController = Ember.ObjectController.extend({
  needs: ['application'],
  appointments: [],
  date: "",
  time: "",

  actions: {
    load_appointments: function (date) {
      this.set('date', date)
      this.set('appointments', this.get('store').find('appointment', {
        clinic_id: this.get('model').get('id'),
        date: date
      }));
    },
    recordTime: function (time) {
      this.set('time', time)
    },
    bookServiceUser: function (service_user, time) {
      if (!service_user) {
        service_user = this.get('suModel')

        var willBook = confirm("Confirm booking for " + service_user.get('personal_fields.name') + " at " + time)
        if (willBook) {
          this.set('time', time)
        } else {
          return;
        }
      }

      var sp = this.get('controllers.application.currentUser')
      var self = this,
          model = self.get('model')

      var new_apt = this.get('store').createRecord('appointment', {
        date: this.get('date'),
        time: this.get('time'),
        service_provider: sp,
        service_user: service_user,
        priority: 'other',
        visit_type: 'ante-natal',
        clinic_id: model.get('id')
      });

      new_apt.save().then(function () {
        self.set('appointments', self.get('store').find('appointment', {
          clinic_id: self.get('model').get('id'),
          date: self.get('date')
        }));
      });
    }
  },

  times: function () {
    if (this.get('appointments').length == 0) {return []}

    var self = this,
        times = [],
        apts = this.get('appointments'),
        model = this.get('model');
        range = moment().range(
          moment(this.get('date') + "T" + model.get('opening_time')),
          moment(this.get('date') + "T" + model.get('closing_time'))
        );

    range.by('minutes', function (mom) {
      if (mom.minute() % 15 == 0 || mom.minute() == 0) {
        times.push(Ember.Object.create({
          time: mom.format("HH:mm")
        }));
      }
    });

    apts.forEach(function (apt) {
      times.forEach(function (time, index) {
        var cal_time = moment(self.get('date') + "T" + time.time),
            apt_time = moment(self.get('date') + "T" + apt.get('time'));

        if (cal_time.isSame(apt_time)) {
          apt.get('service_user').then(function () {
            times[index].set('service_user', apt.get('service_user'))
          })
        }
      });
    });

    return times;
  }.property('appointments.@each'),

  next_weeks: function () {
    var collection = [],
        daysOn = [],
        days = this.get('model.days')

    for (var day in days) {
      var on = days[day]

      if (on) {
        daysOn.push(day)
      }
    }

    var current_date = moment().day(daysOn[0])

    for (var i = 0;i < 6;i++) {
      collection.push({
        weekName: i + 1,
        date: current_date.format("YYYY-MM-DD"),
        formattedDate: current_date.format("dddd, MMMM Do")
      });

      current_date = current_date.day(2 + 7)
    }

    return collection;
  }.property()
});
