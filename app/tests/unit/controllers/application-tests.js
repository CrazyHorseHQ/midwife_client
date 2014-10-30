// Sample controller test.
describe("SmartClient.ApplicationController", function () {
  var controller, server;

  after(function() {
    localStorage.clear();
  });

  beforeEach(function () {
    Ember.run(function () {
      controller = SmartClient.ApplicationController.create({
        store: this.store,
        container: SmartClient.__container__
      });
    });
  });

  it("doesn't have a current user", function () {
    Ember.run(function () {
      expect(controller.get('currentUser')).to.equal(null);
    });
  });

  it("has a current user", function () {
    Ember.run(function () {
      this.store.find('service_provider', 1).then(function(sp) {
        var json_obj = JSON.stringify(
                          sp.toJSON({"includeId": true})
                        );
        localStorage.setItem('loggedinUser', json_obj);

        controller.get('currentUser').should.equal(sp);
      });
    });
  });

  it("is not authenticated", function () {
    Ember.run(function () {
      controller.get('isAuthenticated').should.equal(false);
    });
  });

  it("is authenticated", function () {
    Ember.run(function () {
      localStorage.setItem('authToken', 'FAKE');
      controller.get('isAuthenticated').should.equal(true);
    });
  });
});
