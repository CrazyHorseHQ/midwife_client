import Factories from 'tests/unit/factories';

var qunitModule = window.module;
window.module = function(name, testEnvironment) {
  var env = {
    setup: function() {
      Factories.setup();
      if (testEnvironment && testEnvironment.setup) testEnvironment.setup();
    },
    teardown: function() {
      Factories.teardown();
      if (testEnvironment && testEnvironment.teardown) testEnvironment.teardown();
    }
  };
  qunitModule(name, env);
};

var Helpers = {
  createController: function(fullName, options) {
    if (!fullName) return null;

    var controller = SmartClient.__container__.lookup(fullName);
    if (!controller) throw 'Unknown controller';
    controller.setProperties(options);

    return controller;
  }
};

export default Helpers;
