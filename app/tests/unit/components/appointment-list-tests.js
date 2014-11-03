describe("SmartClient.AppointmentListComponent", function () {
  var component, model, server;

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('clinic', {
        announcement_ids: [1],
        name: "Clinic",
        address: "123 Clinic rd",
        opening_time: "10:00",
        closing_time: "11:00",
        appointment_interval: 15,
        days: {
          monday: true,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      });

      component = SmartClient.AppointmentListComponent.create({
        model: model,
        store: this.store,
        selectedDate: "2014-10-10"
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("has next available Monday as the default and selected date", function () {
    Ember.run(function () {
      var day = moment().day('Monday');
      component.get('defaultDate').should.equal(day.format('YYYY-MM-DD'));
      component.get('selectedDate').should.equal(day.format('YYYY-MM-DD'));
    });
  });

  it("fires dateForward action", function() {
    Ember.run(function() {
      component.send('dateForward');
      component.get('selectedDate').should.equal("2014-10-03");
    });
  });

  it("fires dateBackward action", function() {
    Ember.run(function() {
      component.send('dateBackward');
      component.get('selectedDate').should.equal("2014-10-17");
    });
  });

  it("fires dateChosen action", function() {
    Ember.run(function() {
      var setDate = "2011-12-12"
      component.send('dateChosen', setDate);
      component.get('selectedDate').should.equal(setDate);
    });
  });

  it("opens date picker", function() {
    Ember.run(function() {
      component.send('openPicker');
      component.get('showPicker').should.equal('text');
    });
  });

  it("should calculate 1 appointment and 4 free time slots with appointment data", function() {
    Ember.run(function() {
      var apt = this.store.createRecord('appointment', {
        time: "10:00",
        service_user: this.store.createRecord('service_user', {})
      });
      component.set('appointments', [apt]);
      var calcTimes = component.get('times');
      calcTimes.length.should.equal(5);
      calcTimes[0].get('time').should.equal("10:00");
      calcTimes[0].get('appointment').should.equal(apt);
      // the rest of the times
      calcTimes[1].get('time').should.equal("10:15");
      expect(calcTimes[1].get('appointment')).to.equal(undefined);

      calcTimes[2].get('time').should.equal("10:30");
      expect(calcTimes[2].get('appointment')).to.equal(undefined);
      calcTimes[3].get('time').should.equal("10:45");
      expect(calcTimes[3].get('appointment')).to.equal(undefined);
      calcTimes[4].get('time').should.equal("11:00");
      expect(calcTimes[4].get('appointment')).to.equal(undefined);
    });
  });

  it("should calculate next weeks", function() {
    Ember.run(function() {
      var next_weeks = component.get('next_weeks');
      next_weeks.firstThree.forEach(function(i) {
        i.date.should.equal(
          moment().add(i.weekName, 'weeks').format("YYYY-MM-DD")
        );
      });
      next_weeks.secondThree.forEach(function(i) {
        i.date.should.equal(
          moment().add(i.weekName, 'weeks').format("YYYY-MM-DD")
        );
      });
    });
  });
});

