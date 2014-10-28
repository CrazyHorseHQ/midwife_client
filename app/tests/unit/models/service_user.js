describe("App.ServiceUser", function () {
  it("has age", function () {
    var jane;
    Ember.run(function () {
      // Won't actually load until the end of the run-block.
      jane = SmartClient.ServiceUser.find(1);
    });
    jane.get("age").should.equal("29");
  });
});
