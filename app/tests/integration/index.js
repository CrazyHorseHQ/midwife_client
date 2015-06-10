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
           window.fakeServer = new FakeServer();
         },
  teardown: function() {
              window.fakeServer.restore();
              SmartClient.reset();
            }
});
