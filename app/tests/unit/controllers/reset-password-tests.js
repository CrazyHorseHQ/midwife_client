// Sample controller test.
describe("SmartClient.ResetPasswordController", function () {
  var controller, model, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      model = this.store.createRecord('reset_password');
      controller = SmartClient.ResetPasswordController.create({
        content: model,
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("saves new password", function () {
    Ember.run(function () {
      var rpResponse = '{ "reset_password": { "service_provider_id":1,"id":1 } }';
      server.respondWith(
        "POST",
        "/reset_passwords",
        [ 201, { "Content-Type": "application/json" }, rpResponse ]
      );
      controller.set('password', 'asdf');
      controller.set('password_verification', 'asdf');
      controller.send('submit');
      server.respond();

      model.get('password').should.equal('asdf');
      model.get('password_verification').should.equal('asdf');
    });
  });
});
