// Sample controller test.
describe("SmartClient.ServiceUsersCreateController", function () {
  var controller, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('service_user', {});
      controller = SmartClient.ServiceUsersCreateController.create({
        content: model,
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("creates new SU", function () {
    Ember.run(function () {
      var saveSUResponse = '{ "service_user": { "name":"Name","id":1 } }';
      server.respondWith(
        "POST",
        "/service_users",
        [ 201, { "Content-Type": "application/json" }, saveSUResponse ]
      );
      controller.send('submit');
      server.respond();
    });
  });
});
