test('Login fails', function(){
  expect(5);
  visit('/login').then(function (){

    /*
      var loginResponse = '{ "login": { "token":"t0k3n","id":1 } }';
      server.respondWith(
        "POST",
        "/login",
        [ 201, { "Content-Type": "application/json" }, loginResponse ]
      );
      server.respond();
      */

    equal(find('div.nine h2').text(), 'Table 1', 'Table 1 heading displayed');
    return click('#menu li:eq(0) > a');
  }).then(function(){
    equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Added pizza to tab');
    equal(find('#total span').text(), '$15.00', 'Total price updated with pizza price');
    visit('/tables/3').then(function (){
      equal(find('div.nine h2').text(), 'Table 3', 'Table 3 heading displayed');
      visit('/tables/1').then(function (){
        equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza still in tab');
      });
    });
  });
});
