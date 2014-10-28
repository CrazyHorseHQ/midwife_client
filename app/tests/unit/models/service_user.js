describe("App.ServiceUser", function () {
  it("has age", function () {
    var jane;
    Ember.run(function () {
      // Won't actually load until the end of the run-block.
      jane = this.store.createRecord('service_user' ,{
        personal_fields: {
          dob: moment().subtract(29, 'years').format('YYYY-MM-DD')
        }
      });
      jane.get("age").should.equal(29);
    });
  });
});
