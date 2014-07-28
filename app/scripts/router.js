SmartClient.Router.map(function () {

  this.resource('service_providers', function(){
    this.resource('service_provider', { path: '/:service_provider_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });

  this.resource('service_users', function(){
    this.resource('service_user', { path: '/:service_user_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });

  this.resource('appointments', function(){
    this.resource('appointment', { path: '/:appointment_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
});
