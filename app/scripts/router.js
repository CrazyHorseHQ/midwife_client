SmartClient.Router.map(function () {
  this.route('about');
  this.route('login');
  this.route('logout');
  this.route('reset_passwords');
  this.route('reset_password', { path: 'reset_passwords/:token' });

  this.resource('service_providers', function(){
    this.resource('service_provider', { path: '/:service_provider_id' });
    this.route('create');
  });

  this.resource('service_users', function(){
    this.route('create');
  });

  this.resource('service_user', { path: '/service_users/:service_user_id' }, function(){
    this.resource('appointment.service_options', function() {
      this.resource('appointment.service_option', {path: '/:service_option_id'})
    });

    this.resource('service_user.personal', {path: '/personal'})
    this.resource('service_user.ante', {path: '/ante'})
    this.resource('service_user.post', {path: '/post'})
    this.resource('service_user.parity', {path: '/parity'})
    this.resource('service_user.anti_ds', {path: '/anti_ds'})

    this.resource('service_user.service_options', {path: '/service_options'}, function() {
      this.resource('service_user.service_option', {path: '/:service_option_id'}, function () {
        this.resource('service_user.clinics', {path: '/clinics'}, function () {
          this.resource('service_user.clinic', {path: '/:clinic_id'});
        });
      });
    });
  });

  this.resource('service_options', function() {
    this.resource('service_option', {path: '/:service_option_id'}, function(){});
  });

  this.resource('pregnancy_actions', function() {});

  this.resource('service_options', function () {
    this.resource('service_option', {path: '/:service_option_id'}, function () {
      this.resource('clinics', function () {
        this.resource('clinic', {path: '/:clinic_id'});
      });
    });
  });
});
