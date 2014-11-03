describe("SmartClient.AutoSearchComponent", function () {
  var component, model, fakeXhr, requests;

  before(function() {
    fakeXhr = sinon.useFakeXMLHttpRequest();
    var reqs = requests = [];

    fakeXhr.onCreate = function (xhr) {
      reqs.push(xhr);
    };
  });

  after(function() {
    fakeXhr.restore();
  });

  beforeEach(function () {
    Ember.run(function () {
      component = SmartClient.AutoSearchComponent.create({
        store: this.store,
      });
      component.appendTo('#mocha-fixture');
    });
  });

  it("searches for hospital number", function () {
    Ember.run(function () {
      component.set('searchString', 'H123');
      var results = component.get('searchResults');
      // we assert on the requests made
      requests.pop().url.should.equal(
        "http://127.0.0.1:5000/service_users?hospital_number=H123"
      );
    });
  });

  it("searches for test hospital number", function () {
    Ember.run(function () {
      component.set('searchString', 't123');
      var results = component.get('searchResults');
      // we assert on the requests made
      requests.pop().url.should.equal(
        "http://127.0.0.1:5000/service_users?hospital_number=t123"
      );
    });
  });

  it("searches for dob", function () {
    Ember.run(function () {
      component.set('searchString', '@12-12-1983');
      var results = component.get('searchResults');
      // we assert on the requests made
      requests.pop().url.should.equal(
        "http://127.0.0.1:5000/service_users?dob=12-12-1983"
      );
    });
  });

  it("searches for name", function () {
    Ember.run(function () {
      component.set('searchString', 'Roisin');
      var results = component.get('searchResults');
      // we assert on the requests made
      requests.pop().url.should.equal(
        "http://127.0.0.1:5000/service_users?name=Roisin"
      );
    });
  });
});

