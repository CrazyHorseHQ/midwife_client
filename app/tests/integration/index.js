/*
import Application from 'app/scripts/app';
import Router from 'app/scripts/router';
import TestHelpers from 'tests/integration/helpers';
import PretenderServer from 'tests/integration/pretender';

Router.reopen({ location: 'none' });

var App = Application.create();

var TestAdapter = Ember.Test.QUnitAdapter.extend({
  exception: function(error) {
    if (error instanceof DS.InvalidError) return;
    this._super(error);
  }
});

Ember.Test.adapter = TestAdapter.create();
App.setupForTesting();
App.injectTestHelpers();
App.TestHelpers = TestHelpers;
App.PretenderServer = PretenderServer;

Ember.keys(requirejs.entries).forEach(function(entry) {
  if (!(/integration\/tests/).test(entry)) return;

  require(entry, null, null, true);
});

App.PretenderServer.unhandledRequest = function(verb, path, request, error) {
  console.warn("----------- PRETENDER ERROR -------------");
  console.warn("verb:", verb);
  console.warn("path:", path);
  console.warn("request:", request);
  console.warn("error:", error);
  console.warn("----------- --------------- -------------");
};

export default App;
*/
