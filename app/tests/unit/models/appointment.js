describe("SmartClient.Appointment", function () {
  var subject;

  it("can be deleted", function () {
    Ember.run(function () {
      subject = this.store.createRecord('appointment' ,{
        date: moment().add(29, 'days').format('YYYY-MM-DD'),
      });
      // Won't actually load until the end of the run-block.
      subject.get("canDelete").should.equal(true);
    });
  });

  it("can transform calendar date time", function () {
    Ember.run(function () {
      subject = this.store.createRecord('appointment' ,{
        date: moment().add(1, 'days').format('YYYY-MM-DD'),
        time: "12:00:00"
      });
      // Won't actually load until the end of the run-block.
      subject.get("calendarDateTime").should.equal("Tomorrow at 12:00 PM");
    });
  });

  it("is drop-in", function () {
    Ember.run(function () {
      subject = this.store.createRecord('appointment' ,{
        priority: "drop-in"
      });
      // Won't actually load until the end of the run-block.
      subject.get("isDropIn").should.equal(true);
    });
  });
});
