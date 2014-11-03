describe("SmartClient.ClinicAnnouncementsComponent", function () {
  var component, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('clinic', {
        announcement_ids: [1],
        name: "Clinic",
        address: "123 Clinic rd"
      });
      component = SmartClient.ClinicAnnouncementsComponent.create({
        addMode: false,
        clinic: model,
        store: this.store,
        selectedDate: "2014-12-12"
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("has announcements in filtered list", function () {
    Ember.run(function () {
      component.get('filtered_list').length.should.equal(1);
    });
  });

  it("has no announcements in filtered list", function () {
    Ember.run(function () {
      component.set('selectedDate', '1999-10-10');
      component.get('filtered_list').length.should.equal(0);
    });
  });

  it("setup new note", function() {
    Ember.run(function () {
      component.setupNewNote();
      component.get('model.clinic').should.equal(model);
      component.get('model.date').should.equal("2014-12-12");
    });
  });

  it("should toggle add mode", function() {
    component.set('addMode', false);
    component.send('toggleAddMode');
    component.get('addMode').should.equal(true);
  });

  it("should add announcement to the clinic", function() {
    Ember.run(function () {
      var response = '{ "announcement": { "note":"NOTE","id":1 } }';
      server.respondWith(
        "POST",
        "/clinics/(null)/announcements",
        [ 201, { "Content-Type": "application/json" }, response ]
      );

      component.set('blocking', false);
      component.set('note', "something new");
      component.send('addAnnouncement');
      server.respond();
    });
  });
});

