describe("SmartClient.BookingModalComponent", function () {
  var component, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('clinic', {});
      su = this.store.createRecord('service_user', {});

      component = SmartClient.BookingModalComponent.create({
        model: model,
        service_user: su,
        store: this.store,
        time: "10:00",
        selectedDate: "2014-12-12",
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("should create appointment", function() {
    Ember.run(function () {
      var response = '{ "appointment": { "id":11, "time": "10:00" }}';
      server.respondWith(
        "POST",
        "/appointments",
        [ 201, { "Content-Type": "application/json" }, response ]
      );

      component.send('bookServiceUser');
      server.respond();
    });
  });

  it("should set SU", function() {
    Ember.run(function () {
      var su = this.store.createRecord('service_user', {});
      component.send('suChosen', su);
      component.get('service_user').should.equal(su);
    });
  });

  it("should prompt to search again", function() {
    Ember.run(function () {
      component.send('searchAgain');
      expect(component.get('service_user')).to.equal(null);
    });
  });
});

