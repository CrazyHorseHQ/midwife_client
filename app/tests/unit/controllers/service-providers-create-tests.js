// Sample controller test.
describe("SmartClient.ServiceProvidersCreateController", function () {
  var controller, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('service_provider', {});
      controller = SmartClient.ServiceProvidersCreateController.create({
        content: model,
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("creates new SP", function () {
    Ember.run(function () {
      var saveSPResponse = '{ "service_provider": { "name":"Name","id":1 } }';
      server.respondWith(
        "POST",
        "/service_providers",
        [ 201, { "Content-Type": "application/json" }, saveSPResponse ]
      );
      controller.send('submit');
      server.respond();
    });
  });
});
