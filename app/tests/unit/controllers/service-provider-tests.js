// Sample controller test.
describe("SmartClient.ServiceProviderController", function () {
  var controller, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('service_provider', {
        admin: false,
        active: false
      });
      controller = SmartClient.ServiceProviderController.create({
        content: model,
        store: this.store,
        container: SmartClient.__container__,
        controllers: {
          application: {
            currentUser: {
              admin: true
            }
          }
        }
      });
    });
  });

  it("saves details for admin SP", function () {
    Ember.run(function () {
      var saveSPResponse = '{ "service_provider": { "name":"Name","id":1 } }';
      server.respondWith(
        "POST",
        "/service_providers",
        [ 201, { "Content-Type": "application/json" }, saveSPResponse ]
      );
      controller.send('save');
      server.respond();
    });
  });

  it("toggles admin state on model", function() {
    Ember.run(function() {
      controller.set('controllers.application.currentUser.admin', true);
      controller.send('activate', model);
      model.get('active').should.equal(true);
    });
  });

  it("doesn't toggle admin state on model", function() {
    Ember.run(function() {
      controller.set('controllers.application.currentUser.admin', false);
      controller.send('activate', model);
      model.get('active').should.equal(false);
    });
  });
});
