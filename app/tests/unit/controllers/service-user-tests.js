var subject;
module('SmartClient.ServiceUserController', {
  setup: function() {
    subject = SmartClient.createController('controller:service_user', {});
  }
});

test('saveBaby', function() {
  ic.ajax.defineFixture('/service_users/1', {});
  var adapter = subject.store.adapterFor('service_user');
  sinon.spy(adapter, 'ajax');
  //subject.set('model', 'the@email.com')
  subject.send('saveBaby');
  //deepEqual("{\"delivery_date_time\":\"2014-12-12 12:12:12\"}", adapter.ajax.getCall(0).args[2].data);
  adapter.ajax.restore();
});
