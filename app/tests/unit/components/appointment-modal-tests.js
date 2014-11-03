describe("SmartClient.AppointmentModalComponent", function () {
  var component, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('appointment', {
        time: "10:00",
        service_user: this.store.createRecord('service_user', {})
      });

      component = SmartClient.AppointmentModalComponent.create({
        model: model,
        service_providers: this.store.find('service_provider'),
        selected_sp: this.store.createRecord('service_provider', {id: 1}),
        store: this.store,
        selected_time: "10:00",
        times: [
          Ember.Object.create({appointment: model, time: "10:00"}),
          Ember.Object.create({time: "10:15"}),
          Ember.Object.create({time: "10:30"}),
          Ember.Object.create({appointment: this.store.createRecord('appointment', {}), time: "10:45"}),
          Ember.Object.create({appointment: this.store.createRecord('appointment', {}), time: "11:00"})
        ]
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("gets available times to reschedule appointment", function () {
    Ember.run(function () {
      var fTimes = component.get('filteredTimes');
      fTimes.length.should.equal(3);
      fTimes[0].get('time').should.equal("10:00");
      fTimes[1].get('time').should.equal("10:15");
      fTimes[2].get('time').should.equal("10:30");
    });
  });

  it("should update appointment data", function() {
    Ember.run(function () {
      var response = '{ "service_providers": [{ "id":1 }]}';
      server.respondWith(
        "GET",
        "/service_providers",
        [ 200, { "Content-Type": "application/json" }, response ]
      );

      component.set('selected_time', "10:15");
      component.send('updateAppointment');
      server.respond();
      component.get('model.time').should.equal("10:15");
    });
  });
});

