test('Login fails', function(){
  var loginResponse = '{ "error": { "message": "Invalid login credentials." } }';
  fakeServer.server.respondWith(
    "POST",
    "/login",
    [ 400, { "Content-Type": "application/json" }, loginResponse ]
  );

  visit('/login').then(function (){
    fillIn('input#username', 'USER');
    fillIn('input#password', 'InvalidPWD');
    click('button.btn');
    fakeServer.server.respond();

    equal(find('div.error').text(), 'error: Invalid username or password', 'error displayed');
  });
});
