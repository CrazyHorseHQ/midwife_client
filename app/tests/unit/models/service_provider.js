describe("SmartClient.ServiceProvider", function () {
  var subject;

  it("is active", function () {
    Ember.run(function () {
      subject = this.store.createRecord('service_provider' ,{
        active: true
      });
      // Won't actually load until the end of the run-block.
      subject.get("activated_text").should.equal("Deactivate");
    });
  });
});
