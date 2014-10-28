mocha.setup("bdd");
should = chai.should();
expect = chai.expect;

// Replace our fixture-based store with a REST-based store for testing, so we
// don't need a server.  We disable simulateRemoteResponse so that objects will
// appear to load at the end of every Ember.run block instead of waiting for a
// timer to fire.
SmartClient.ApplicationStore = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create({ simulateRemoteResponse: false })
});
SmartClient.setupForTesting()
SmartClient.injectTestHelpers()
SmartClient.rootElement = '#ember-testing';

// Declare some fixture objects to use in our test application.  There's
// nothing like factory_girl or machinist yet.
SmartClient.ServiceUser.FIXTURES = [{
  id: 1,
    hospital_number: "T9876543",
    personal_fields: {
      dob: "12-31-1985"
    },
    clinical_fields: {},
    pregnancies: [],
    babies: [],
    appointments: []
}];

// Run before each test case.
beforeEach(function () {
  // Put the application into a known state, and destroy the defaultStore.
  // Be careful about DS.Model instances stored in SmartClient App; they'll be invalid
  // after this.
  // This is broken in some versions of Ember and Ember Data, see:
  // https://github.com/emberjs/data/issues/847
  Ember.run(function () {
    SmartClient.reset();
    window.store = SmartClient.__container__.lookup("store:main");
  });
  // Display an error if asynchronous operations are queued outside of
  // Ember.run.  You need this if you want to stay sane.
  Ember.testing = true;
});

// Run after each test case.
afterEach(function () {
  Ember.testing = false;
});

// Optional: Clean up after our last test so you can try out the app
// in the jsFiddle.  This isn't normally required.
after(function () {
  Ember.run(function () { SmartClient.reset(); });
});

// Load associations immediately, instead of waiting for FixtureAdapter's
// asynchronous loads.  Basically, all we need to do is access each object
// from inside Ember.run.
// TODO: We can't test this or insert where needed until SmartClient.reset() works.
// TODO: Handle hasMany.
function loadAssociations(object /*, paths... */) {
  var paths = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < paths.length; i++) {
    var components = paths[i].split(".");
    for (var j = 0; j < components.length; j++) {
      Ember.run(function () {
        var path = components.slice(0, j+1).join(".");
        object.get(path);
      });
    }
  }
}
