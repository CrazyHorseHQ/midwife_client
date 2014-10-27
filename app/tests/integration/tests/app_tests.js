module('SmartClient.IntegrationTests.App', {
  setup: function() {
    SmartClient.reset();
  }
});

test('app.creation.cancel', function() {
  visit('/service_users');
  andThen(function() {
    equal(find('#su-list li').size(), 1);
  });
});
