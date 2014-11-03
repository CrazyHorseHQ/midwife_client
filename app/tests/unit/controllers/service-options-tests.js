// Sample controller test.
describe("SmartClient.ServiceOptionsController", function () {
  var controller, model;

  beforeEach(function () {
    Ember.run(function () {
      controller = SmartClient.ServiceOptionsController.create({
        content: {},
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("route context changed", function () {
    Ember.run(function () {
      // Route transition doesn't work in testing mode.
      var transition = sinon.mock(controller);
      transition.expects('transitionToRoute').once()
      controller.set('routeContext', 'custom');
      controller.send('serviceOptionSelected', 1);

      transition.verify();
    });
  });
});
