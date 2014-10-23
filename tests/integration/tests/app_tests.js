module('SmartApp.IntegrationTests.App', {
  setup: function() {
    SmartApp.reset();
  }
});

test('app.creation.cancel', function() {
  visit('/service_users');
  andThen(function() {
    equal(find('#su-list li').size(), 1);
  });
});
