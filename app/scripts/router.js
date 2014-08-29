SmartClient.Router.map(function () {

  this.resource('appointments', function(){
    this.resource('appointment', { path: '/:appointment_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });

  this.route('login');
  this.route('logout');

  this.resource('service_providers', function(){
    this.resource('service_provider', { path: '/:service_provider_id' });
    this.route('create');
  });

  this.resource('service_users', function(){
    this.resource('service_user', { path: '/:service_user_id' }, function(){
      this.resource('appointment.service_options', function() {
        this.resource('appointment.service_option', {path: '/:service_option_id'})
      });
    });
    this.route('create');
  });

  this.resource('service_options', function() {
    this.resource('service_option', {path: '/:service_option_id'}, function(){});
  });

  this.route('results', {path: '/results/:searchString'});

  this.resource('service_options', function () {
    this.resource('service_option', {path: '/:service_option_id'}, function () {
      this.resource('clinics', function () {
        this.resource('clinic', {path: '/:clinic_id'});
      });
    });
  });
});
