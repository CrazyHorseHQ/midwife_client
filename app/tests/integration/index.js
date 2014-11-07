SmartClient.Router.reopen({ location: 'none' });

SmartClient.ApplicationStore = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create({ simulateRemoteResponse: false })
});
SmartClient.setupForTesting()
SmartClient.injectTestHelpers()
SmartClient.rootElement = '#ember-testing';


// This will be a single module running all the tests
module('SmartClient root tests', {
  setup: function () {
           SmartClient.reset();
           window.fakeServer = new FakeServer();
         },
  teardown: function() {
              SmartClient.reset();
              window.fakeServer.restore();
            }
});
