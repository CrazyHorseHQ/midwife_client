// Not sure if this is needed
import AJAX_FIXTURES from 'tests/integration/fixtures/ajax';

var server = new Pretender(function() {
  this.get('/service_users', function() {
    var fixture = {
      'service_users': [ require('tests/integration/fixtures/service_user')['default'][0] ]
    };
    return [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(fixture)
    ];
  });

  this.get('/service_users/1', function() {
    var fixture = {
      'service_user': require('tests/integration/fixtures/service_user')['default'][0]
    };
    return [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(fixture)
    ];
  });
});

//Log out all ajax call handled by Pretender. Uncomment when you are debugging.
//server.handledRequest = function(verb, path, request) {
//  console.log('PRETENDER', verb, path, request);
//};

export default server;
