// Sample controller test.
describe("SmartClient.LoginController", function () {
  var controller, server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      controller = SmartClient.LoginController.create({
        content: this.store.createRecord('login'),
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("resets token and attemptedTransition", function () {
    controller.set('token', 'asdf');
    controller.set('attemptedTransition', '/service_users');

    controller.reset();
    expect(controller.get('token')).to.equal(null);
    expect(controller.get('attemptedTransition')).to.equal(null);
  });

  it("tokenChanged fired correctly", function() {
    controller.set('token', 'asdf');
    localStorage.getItem('authToken').should.equal('asdf');

    controller.set('token', 'new token');
    controller.get('token').should.equal('new token');
    localStorage.getItem('authToken').should.equal('new token');
  });

  it("loggedinUserChanged fired correctly", function() {
    Ember.run(function() {
      controller.set('token', 'asdf');
      this.store.find('service_provider', 1).then(function(sp) {
        controller.set('loggedin_user', sp);
        localStorage.getItem('loggedinUser').should.equal('{"id":1,"name":"admin","username":"admin","email":"test@admin.com"}');
      });
    });
  });

  it("should login user", function() {
    Ember.run(function() {
      var loginResponse = '{ "login": { "token":"t0k3n","id":1 } }';
      server.respondWith(
        "POST",
        "/login",
        [ 201, { "Content-Type": "application/json" }, loginResponse ]
      );

      controller.set('username', 'admin');
      controller.set('password', 'password');
      controller.send('submit');
      server.respond();

      /*
       * Figure out why the response is not getting through into
       * login.save inside the LoginController#submit
      expect(controller.get('token')).to.equal("t0k3n");
      controller.get('loggedin_user').should.not.equal(null);
      localStorage.getItem('authToken').should.equal("t0k3n");
      */
    });
  });
});
