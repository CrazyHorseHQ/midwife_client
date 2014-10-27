import Application from 'app/scripts/app';
import Router from 'app/scripts/router';
import TestHelpers from 'app/tests/unit/helpers';
import Factories from 'app/tests/unit/factories';

Router.reopen({ location: 'none' });

window.SmartClient = Application.create();
SmartClient.Factories = Factories;
SmartClient.createController = TestHelpers.createController;

Ember.keys(requirejs.entries).forEach(function(entry) {
  if (!(/unit.*\-tests/).test(entry)) return;

  require(entry, null, null, true);
});

export default {};
