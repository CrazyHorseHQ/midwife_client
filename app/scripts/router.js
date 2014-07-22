MidwifeClient.Router.map(function () {

  this.resource('midwives', function(){
    this.resource('midwife', { path: '/:midwife_id' }, function(){
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
